import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdateIllustrationDto,
  UsersDto,
  UsersInfoDto,
  UsersPasswordDto,
} from './dto';
import {
  Users,
  UsersCreate,
  UsersInfo,
  UsersPassword,
  UserTokenWithoutPassword,
} from './types';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../auth-user/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getUsersById(id: number): Promise<Users> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        illustration: true,
        email: true,
        telephone: true,
        aPropos: true,
        role_utilisateur: {
          select: {
            id: true,
            nomRole: true,
          },
        },
        motDePasse: true,
      },
    });

    if (!UsersById) throw new ForbiddenException("L'identifiant n'existe pas!");
    return UsersById;
  }

  async getUsers(): Promise<Users[]> {
    const users = await this.prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        illustration: true,
        email: true,
        telephone: true,
        aPropos: true,
        role_utilisateur: {
          select: {
            id: true,
            nomRole: true,
          },
        },
        motDePasse: true,
      },
    });

    if (!users) throw new ForbiddenException("Il n'y a aucun utilisateur!");
    return users;
  }

  async createUsers(dto: UsersDto): Promise<UsersCreate> {
    const userEmail = await this.prisma.utilisateur.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userEmail)
      throw new ForbiddenException(
        'Cet email appartient déjà à un utilisateur',
      );

    const hash = await this.hashData(dto.motDePasse);

    //Number(dto.role) === 1 ? 'admin-user.png' : 'writter-user.png';
    const illustration =
      Number(dto.role) === 1
        ? 'admin-user.png'
        : Number(dto.role) === 2
        ? 'writter-user.png'
        : 'normal-user.png';

    return await this.prisma.utilisateur.create({
      data: {
        nom: dto.nom,
        prenom: dto.prenom,
        illustration,
        email: dto.email,
        telephone: dto.telephone,
        aPropos: dto.aPropos,
        role: Number(dto.role),
        motDePasse: hash,
      },
    });
  }

  async updateUsersInfoById(
    id: number,
    dto: UsersInfoDto,
  ): Promise<UserTokenWithoutPassword> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UsersById) throw new ForbiddenException("Lidentifiant n'éxiste pas!");
    else {
      const user = await this.prisma.utilisateur.update({
        data: {
          nom: dto.nom,
          prenom: dto.prenom,
          email: dto.email,
          telephone: dto.telephone,
          aPropos: dto.aPropos,
          role: Number(dto.role),
        },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          telephone: true,
          aPropos: true,
          role: true,
        },
        where: {
          id,
        },
      });

      const token = await this.getToken(
        user.id,
        user.email,
        user.nom,
        user.prenom,
        user.role,
        UsersById.illustration,
        user.telephone,
        user.aPropos,
      );

      return [user, token];
    }
  }

  async updateIllustrationById(
    id: number,
    dto: UpdateIllustrationDto,
  ): Promise<UsersInfo> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UsersById) throw new ForbiddenException("L'identifiant n'éxiste pas!");
    else {
      if (
        fs.existsSync(`./images/${UsersById.illustration}`) &&
        !['admin-user.png', 'normal-user.png', 'writter-user.png'].includes(
          UsersById.illustration,
        )
      ) {
        fs.unlinkSync(`./images/${UsersById.illustration}`);
      }

      return await this.prisma.utilisateur.update({
        data: {
          illustration: dto.illustration,
        },
        where: {
          id,
        },
      });
    }
  }

  async updateUsersPasswordById(
    id: number,
    dto: UsersPasswordDto,
  ): Promise<UsersPassword> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) throw new ForbiddenException("L'identifiant n'éxiste pas!");
    else {
      const isMatch = bcrypt.compareSync(dto.ancienMotDePasse, user.motDePasse);
      if (!isMatch) {
        throw new ForbiddenException('Mot de passe actuel incorrect!');
      } else {
        const hash = await this.hashData(dto.nouveauMotDePasse);
        return await this.prisma.utilisateur.update({
          data: {
            motDePasse: hash,
          },
          select: {
            id: true,
            motDePasse: true,
          },
          where: {
            id,
          },
        });
      }
    }
  }

  async deleteUsersById(id: number): Promise<Users> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UsersById) throw new ForbiddenException("L'identifiant n'existe pas!");

    if (
      fs.existsSync(`./images/${UsersById.illustration}`) &&
      !['admin-user.png', 'normal-user.png', 'writter-user.png'].includes(
        UsersById.illustration,
      )
    ) {
      fs.unlinkSync(`./images/${UsersById.illustration}`);
    }

    return await this.prisma.utilisateur.delete({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        illustration: true,
        email: true,
        telephone: true,
        aPropos: true,
        role_utilisateur: {
          select: {
            id: true,
            nomRole: true,
          },
        },
        motDePasse: true,
      },
    });
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

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
