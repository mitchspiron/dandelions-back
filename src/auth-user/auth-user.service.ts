import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthUserDtoSignin,
  AuthUserDtoSignup,
  forgotPasswordDto,
  resetPasswordDto,
} from './dto';
import * as bcrypt from 'bcrypt';
import { Token, User, UserToken } from './types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthUserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(dto: AuthUserDtoSignup) {
    const token = await Promise.all([
      this.jwtService.signAsync(dto, {
        secret: 'super-secret',
        expiresIn: 60 * 15,
      }),
    ]);

    const userEmail = await this.prisma.utilisateur.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userEmail)
      throw new ForbiddenException(
        'Cet email appartient déjà à un utilisateur',
      );

    /* console.log(token[0]); */

    await this.mailService
      .sendMailConfirmation(dto.email, token[0])
      .then(() => console.log('Vérifier votre boîte email!'))
      .catch(() => {
        throw new ForbiddenException(
          "Un problème s'est produit, vérifier votre connexion internet!",
        );
      });
  }

  async confirm(data, res, req): Promise<User> {
    const secret = 'super-secret';
    try {
      const newUser = this.jwtService.verify(data, { secret: secret });
      delete newUser.iat;
      delete newUser.exp;
      newUser.motDePasse = await this.hashData(newUser.motDePasse);
      const newConfirmUser = await this.prisma.utilisateur.create({
        data: {
          nom: newUser.nom,
          prenom: newUser.prenom,
          illustration: 'normal-user.png',
          email: newUser.email,
          telephone: newUser.telephone,
          aPropos: newUser.aPropos,
          role: 3,
          motDePasse: newUser.motDePasse,
        },
      });
      //res.redirect('http://localhost:8080/se-connecter');
      req.flash('info', 'Flash is back!');
      res.redirect('/bienvenu');
      return newConfirmUser;
    } catch (e) {
      const url = process.env.URL_FRONT;
      res.redirect(`${url}/erreur-confirmation-email`);
    }
  }

  async signin(dto: AuthUserDtoSignin): Promise<UserToken> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Compte inexistant');

    const passwordMatches = await bcrypt.compare(
      dto.motDePasse,
      user.motDePasse,
    );
    if (!passwordMatches)
      throw new ForbiddenException('Mot de passe incorrect');

    const token = await this.getToken(
      user.id,
      user.email,
      user.nom,
      user.prenom,
      user.role,
      user.illustration,
      user.telephone,
      user.aPropos,
    );

    /* res.cookie('dadelions_token', token.access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); */

    return [user, token];
  }

  decodeToken(req: Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const secret = 'at-secret';
    const data = this.jwtService.verify(token, { secret });
    delete data.iat;
    delete data.exp;

    return data;
  }

  async isLoggedIn(req: Request, res: Response): Promise<any> {
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Session invalid');
    }

    try {
      const decoded = this.decodeToken(req);
      req.user = decoded;
      console.log(req.user);
    } catch (err) {
      throw new UnauthorizedException('Session invalid');
    }
    res.send(req.user);
  }

  async forgotPassword(dto: forgotPasswordDto) {
    const token = await Promise.all([
      this.jwtService.signAsync(dto, {
        secret: 'super-secret',
        expiresIn: 60 * 15,
      }),
    ]);

    const userEmail = await this.prisma.utilisateur.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!userEmail) throw new ForbiddenException("Ce compte n'éxiste pas");

    /* console.log(token[0]); */

    await this.mailService
      .sendMailForgotPassword(dto.email, token[0])
      .then(() => console.log('Vérifier votre boîte email!'))
      .catch(() => {
        throw new ForbiddenException(
          "Un problème s'est produit, vérifier votre connexion internet!",
        );
      });
  }

  async resetPassword(dto: resetPasswordDto, data): Promise<User> {
    try {
      const secret = 'super-secret';
      const newPassword = this.jwtService.verify(data, { secret: secret });
      delete newPassword.iat;
      delete newPassword.exp;
      const hash = await this.hashData(dto.motDePasse);
      const newUserPassword = await this.prisma.utilisateur.update({
        data: {
          motDePasse: hash,
        },
        where: {
          email: newPassword.email,
        },
      });
      return await newUserPassword;
    } catch (e) {
      throw new ForbiddenException(
        "Ce lien a éxpiré! Vous ne pouvez plus l'utiliser pour recupérer votre mot de passe",
      );
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(
    idUser: number,
    emailUser: string,
    nomUser: string,
    prenomUser: string,
    roleUser: number,
    illustrationUser: string,
    telephoneUser: string,
    aProposUser: string,
  ): Promise<Token> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: idUser,
          emailUser,
          nomUser,
          prenomUser,
          roleUser,
          illustrationUser,
          telephoneUser,
          aProposUser,
        },
        {
          secret: 'at-secret',
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      access_token: at,
    };
  }
}
