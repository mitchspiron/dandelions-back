import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleDto } from './dto';
import { UserRole } from './types';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async getUserRoleById(id: number): Promise<UserRole> {
    const UserRoleById = await this.prisma.role_utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UserRoleById)
      throw new ForbiddenException("L'identifiant n'existe pas!");

    return UserRoleById;
  }

  async getUserRole(): Promise<UserRole[]> {
    const userRole = await this.prisma.role_utilisateur.findMany();

    if (!userRole)
      throw new ForbiddenException("Il n'y a aucun role d'utilisateur!");
    return userRole;
  }

  async createUserRole(dto: UserRoleDto): Promise<UserRole> {
    return await this.prisma.role_utilisateur.create({
      data: {
        nomRole: dto.nomRole,
      },
    });
  }

  async updateUserRoleById(id: number, dto: UserRoleDto): Promise<UserRole> {
    const UserRoleById = await this.prisma.role_utilisateur.findUnique({
      where: {
        id,
      },
    });

    if (!UserRoleById)
      throw new ForbiddenException("L'identifiant n'existe pas!");

    return await this.prisma.role_utilisateur.update({
      data: {
        nomRole: dto.nomRole,
      },
      where: {
        id,
      },
    });
  }

  async deleteUserRoleById(id: number): Promise<UserRole> {
    const UserRoleById = await this.prisma.role_utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!UserRoleById)
      throw new ForbiddenException("L'identifiant n'existe pas!");

    return await this.prisma.role_utilisateur.delete({
      where: {
        id,
      },
    });
  }
}
