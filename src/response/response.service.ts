import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { Response, UnseenResponse } from './types';

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
        vu: false,
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
        vu: true,
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
        vu: true,
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
        vu: true,
        createdAt: true,
      },
    });
  }

  async getUnseenResponse(id: number): Promise<UnseenResponse[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    }

    const response = await this.prisma.reponse.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        vu: false,
        commentaire: {
          article: {
            utilisateur: {
              id: id,
            },
          },
        },
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
        commentaire: {
          select: {
            article: {
              select: {
                id: true,
                titre: true,
                slug: true,
                idRedacteur: true,
              },
            },
          },
        },
        contenu: true,
        vu: true,
        createdAt: true,
      },
    });

    if (!response) {
      throw new ForbiddenException("Il n'y a aucun commentaire!");
    }

    return response;
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
        vu: true,
        createdAt: true,
      },
    });
  }

  async updateResponseToSeen(id: number): Promise<Response> {
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
        vu: true,
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
        vu: true,
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
        vu: true,
        createdAt: true,
      },
    });
  }
}
