import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { Response } from './types';

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async createResponse(id: number, dto: CreateResponseDto): Promise<Response> {
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
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable!');
    }

    return await this.prisma.reponse.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        idCommentaire: commentExists.id,
        contenu: dto.contenu,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            illustration: true,
          },
        },
        idCommentaire: true,
        contenu: true,
        createdAt: true,
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
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            illustration: true,
          },
        },
        idCommentaire: true,
        contenu: true,
        createdAt: true,
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
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            illustration: true,
          },
        },
        idCommentaire: true,
        contenu: true,
        createdAt: true,
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
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            illustration: true,
          },
        },
        idCommentaire: true,
        contenu: true,
        createdAt: true,
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
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            illustration: true,
          },
        },
        idCommentaire: true,
        contenu: true,
        createdAt: true,
      },
    });
  }
}
