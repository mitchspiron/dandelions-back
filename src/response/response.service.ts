import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { Response } from './types';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async createResponse(dto: CreateResponseDto): Promise<Response> {
    const userExists = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(dto.idUtilisateur),
      },
    });

    if (!userExists) {
      throw new ForbiddenException("Cet utilisateur n'existe pas!");
    }

    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id: Number(dto.idCommentaire),
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable!');
    }

    return await this.prisma.reponse.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        idCommentaire: Number(dto.idCommentaire),
        contenu: dto.contenu,
      },
    });
  }

  async getResponseByComment(id: number): Promise<Response[]> {
    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable');
    }

    return await this.prisma.reponse.findMany({
      where: {
        idCommentaire: Number(commentExists.id),
      },
    });
  }

  async getResponseById(id: number): Promise<Response> {
    const responseExists = await this.prisma.reponse.findUnique({
      where: {
        id,
      },
    });

    if (!responseExists) {
      throw new ForbiddenException('Reponse introuvable');
    }

    return await this.prisma.reponse.findUnique({
      where: {
        id,
      },
    });
  }

  async updateResponseById(
    id: number,
    dto: UpdateResponseDto,
  ): Promise<Response> {
    const responseExists = await this.prisma.reponse.findUnique({
      where: {
        id,
      },
    });

    if (!responseExists) {
      throw new ForbiddenException('Reponse introuvable');
    }

    return await this.prisma.reponse.update({
      data: {
        contenu: dto.contenu,
      },
      where: {
        id,
      },
    });
  }

  async deleteResponseById(id: number): Promise<Response> {
    const responseExists = await this.prisma.reponse.findUnique({
      where: {
        id,
      },
    });

    if (!responseExists) {
      throw new ForbiddenException('Reponse introuvable');
    }

    return await this.prisma.reponse.delete({
      where: {
        id,
      },
    });
  }
}
