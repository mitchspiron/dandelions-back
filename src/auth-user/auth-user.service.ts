import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserDtoSignin, AuthUserDtoSignup } from './dto';
import * as bcrypt from 'bcrypt';
import { Token, User, UserToken } from './types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';

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
        expiresIn: '1d',
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

    this.mailService.sendMailConfirmation(dto.email, token[0]);
  }

  async confirm(data): Promise<User> {
    const secret = 'super-secret';
    const newUser = this.jwtService.verify(data, { secret: secret });
    delete newUser.iat;
    delete newUser.exp;
    newUser.motDePasse = await this.hashData(newUser.motDePasse);

    return await this.prisma.utilisateur.create({
      data: {
        nom: newUser.nom,
        prenom: newUser.prenom,
        illustration: newUser.illustration,
        email: newUser.email,
        telephone: newUser.telephone,
        role: Number(newUser.role),
        motDePasse: newUser.motDePasse,
      },
    });
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

    const token = await this.getToken(user.id, user.email);

    return [user, token];
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
