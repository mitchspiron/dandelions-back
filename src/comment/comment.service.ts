import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentdto } from './dto';
import { CreateComment, GetComment } from './types';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto): Promise<CreateComment> {
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
        id: Number(dto.idArticle),
      },
    });

    if (!articleExists) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    return await this.prisma.commentaire.create({
      data: {
        idUtilisateur: dto.idUtilisateur,
        idArticle: dto.idArticle,
        contenu: dto.contenu,
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
        idUtilisateur: true,
        idArticle: true,
        contenu: true,
        createdAt: true,
        reponse: {
          select: {
            id: true,
            idUtilisateur: true,
            contenu: true,
            createdAt: true,
          },
        },
      },
      where: {
        idArticle: Number(postExists.id),
      },
    });
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
        idUtilisateur: true,
        idArticle: true,
        contenu: true,
        createdAt: true,
        reponse: {
          select: {
            id: true,
            idUtilisateur: true,
            contenu: true,
            createdAt: true,
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async updateCommentById(id: number, dto: UpdateCommentdto): Promise<CreateComment>{
    const commentExists = await this.prisma.commentaire.findUnique({
        where: {
            id
        }
    })

    if(!commentExists){
        throw new ForbiddenException("Commentaire introuvable")
    }

    return await this.prisma.commentaire.update({
        data: {
            contenu: dto.contenu
        },
        where: {
            id
        }
    })
  }

  async deleteCommentById(id: number): Promise<CreateComment>{
    const commentExists = await this.prisma.commentaire.findUnique({
        where: {
            id
        }
    })

    if(!commentExists){
        throw new ForbiddenException("Commentaire introuvable")
    }

    return await this.prisma.commentaire.delete({
        where: {
            id
        }
    })
  }
}
