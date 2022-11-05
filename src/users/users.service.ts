import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersInfo, UsersPassword } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsersById(id: number): Promise<Users> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UsersById) throw new ForbiddenException("L'identifiant n'existe pas!");
    return UsersById;
  }

  async getUsers(): Promise<Users[]> {
    const users = await this.prisma.utilisateur.findMany();

    if (!users) throw new ForbiddenException("Il n'y a aucun utilisateur!");
    return users;
  }

  async createUsers(dto: UsersDto): Promise<Users> {
    const hash = await this.hashData(dto.motDePasse);
    return await this.prisma.utilisateur.create({
      data: {
        nom: dto.nom,
        prenom: dto.prenom,
        illustration: dto.illustration,
        email: dto.email,
        telephone: dto.telephone,
        role: Number(dto.role),
        motDePasse: hash,
      },
    });
  }

  async updateUsersInfoById(id: number, dto: UsersInfoDto): Promise<UsersInfo> {
    const UsersById = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UsersById) throw new ForbiddenException("Lidentifiant n'éxiste pas!");
    else {
      return await this.prisma.utilisateur.update({
        data: {
          nom: dto.nom,
          prenom: dto.prenom,
          illustration: dto.illustration,
          email: dto.email,
          telephone: dto.telephone,
          role: Number(dto.role),
        },
        select: {
          id: true,
          nom: true,
          prenom: true,
          illustration: true,
          email: true,
          telephone: true,
          role: true,
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

    return await this.prisma.utilisateur.delete({
      where: {
        id: Number(id),
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
