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
      //res.redirect('http://localhost:8080/login');
      req.flash('info', 'Flash is back!');
      res.redirect('/bienvenu');
      return newConfirmUser;
    } catch (e) {
      res.redirect('http://localhost:8080/erreur-confirmation-email');
    }
  }

  async signin(dto: AuthUserDtoSignin, res: Response): Promise<UserToken> {
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

    const token = await this.getToken(user.id, user.email);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      sameSite: 'none',
    });

    return [user, token];
  }

  async isLoggedIn(req: Request): Promise<any> {
    try {
      const cookie = req.cookies['access_token'];
      const secret = 'at-secret';
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: secret,
      });
      delete data.iat;
      delete data.exp;

      if (!data) {
        throw new UnauthorizedException('Session expiré!');
      }

      return data;
    } catch (e) {
      throw new UnauthorizedException('Session expiré!');
    }
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

  async resetPassword(dto: resetPasswordDto, data, res): Promise<User> {
    const secret = 'super-secret';
    try {
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
      res.redirect('http://localhost:8080/login');
      return newUserPassword;
    } catch (e) {
      res.redirect('http://localhost:8080/erreur-recuperation-mot-de-passe');
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(idUser: number, emailUser: string): Promise<Token> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: idUser,
          emailUser,
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
