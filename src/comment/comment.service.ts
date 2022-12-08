import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentdto } from './dto';
import { CommentToSeen, CreateComment, GetComment } from './types';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    slug: string,
    dto: CreateCommentDto,
  ): Promise<CreateComment> {
    const userExists = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(dto.idUtilisateur),
      },
    });

    if (!userExists) {
      throw new ForbiddenException("Cet utilisateur n'existe pas!");
    }

    const articleExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!articleExists) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    return await this.prisma.commentaire.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        idArticle: articleExists.id,
        contenu: dto.contenu,
        vu: false,
      },
    });
  }

  async getCommentByPost(slug: string): Promise<GetComment[]> {
    const postExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!postExists) {
      throw new ForbiddenException("Cet article n'existe pas");
    }

    return await this.prisma.commentaire.findMany({
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
        article: {
          select: {
            id: true,
            titre: true,
            slug: true,
            idRedacteur: true,
          },
        },
        contenu: true,
        vu: true,
        createdAt: true,
        reponse: {
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
            contenu: true,
            createdAt: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
      where: {
        idArticle: Number(postExists.id),
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getUnseenComment(id: number): Promise<GetComment[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    }

    const comment = await this.prisma.commentaire.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        vu: false,
        article: {
          utilisateur: {
            id: id,
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
        article: {
          select: {
            id: true,
            titre: true,
            slug: true,
            idRedacteur: true,
          },
        },
        contenu: true,
        vu: true,
        createdAt: true,
        reponse: {
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
            contenu: true,
            createdAt: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    if (!comment) {
      throw new ForbiddenException("Il n'y a aucun commentaire!");
    }

    return comment;
  }

  async getCommentById(id: number): Promise<GetComment> {
    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable');
    }

    return await this.prisma.commentaire.findUnique({
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
        article: {
          select: {
            id: true,
            titre: true,
            slug: true,
            idRedacteur: true,
          },
        },
        contenu: true,
        vu: true,
        createdAt: true,
        reponse: {
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
            contenu: true,
            createdAt: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async updateCommentById(
    id: number,
    dto: UpdateCommentdto,
  ): Promise<CreateComment> {
    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable');
    }

    return await this.prisma.commentaire.update({
      data: {
        contenu: dto.contenu,
      },
      where: {
        id,
      },
    });
  }

  async updateCommentToSeen(id: number): Promise<CommentToSeen> {
    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable');
    }

    return await this.prisma.commentaire.update({
      data: {
        vu: true,
      },
      where: {
        id,
      },
    });
  }

  async deleteCommentById(id: number): Promise<CreateComment> {
    const commentExists = await this.prisma.commentaire.findUnique({
      where: {
        id,
      },
    });

    if (!commentExists) {
      throw new ForbiddenException('Commentaire introuvable');
    }

    return await this.prisma.commentaire.delete({
      where: {
        id,
      },
    });
  }
}
