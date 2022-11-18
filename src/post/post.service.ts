import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePostDto,
  UpdateIllustrationDto,
  UpdatePostDto,
  UpdatePostTitleDto,
  UpdateStateDto,
} from './dto';
import {
  CreatePost,
  GetPost,
  UpdatePost,
  UpdateStatePost,
} from './types/post.type';
import * as fs from 'fs';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(dto: CreatePostDto): Promise<CreatePost> {
    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(dto.idRedacteur),
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    const redacteurExists = [1, 2].includes(redacteur?.role_utilisateur?.id);

    if (!redacteurExists) {
      throw new ForbiddenException("Le redacteur sélectionné n'éxiste pas");
    }

    const categorieExists = await this.prisma.categorie_article.findUnique({
      where: {
        id: Number(dto.idCategorie),
      },
    });

    if (!categorieExists) {
      throw new ForbiddenException("La catégorie sélectionnée n'éxiste pas");
    }

    const slug = dto.titre
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (slugExists) {
      throw new ForbiddenException('Cet article existe déja');
    }

    return this.prisma.article.create({
      data: {
        idRedacteur: Number(dto.idRedacteur),
        idCategorie: Number(dto.idCategorie),
        titre: dto.titre,
        slug,
        description: dto.description,
        illustration: dto.illustration,
        contenu: dto.contenu,
        top: false,
        recommadee: false,
        etat: 1,
      },
    });
  }

  async getPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
          },
        },
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        top: true,
        recommadee: true,
        etat_article: {
          select: {
            id: true,
            nomEtat: true,
          },
        },
        createdAt: true,
        commentaire: {
          select: {
            id: true,
            idUtilisateur: true,
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
        },
      },
    });

    if (!post) {
      throw new ForbiddenException("Il n'y a aucun article!");
    }

    return post;
  }

  async getPostBySlug(slug: string): Promise<GetPost> {
    const postBySlug = await this.prisma.article.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
          },
        },
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        top: true,
        recommadee: true,
        etat_article: {
          select: {
            id: true,
            nomEtat: true,
          },
        },
        createdAt: true,
        commentaire: {
          select: {
            id: true,
            idUtilisateur: true,
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
        },
      },
    });

    if (!postBySlug) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    return postBySlug;
  }

  async updatePostBySlug(
    slug: string,
    dto: UpdatePostDto,
  ): Promise<UpdatePost> {
    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!slugExists) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    return await this.prisma.article.update({
      data: {
        idCategorie: Number(dto.idCategorie),
        description: dto.description,
        contenu: dto.contenu,
        slug,
      },
      where: {
        slug,
      },
    });
  }

  async updatePostTitleBySlug(
    slug: string,
    dto: UpdatePostTitleDto,
  ): Promise<UpdatePost> {
    const updatedSlug = dto.titre
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug: updatedSlug,
      },
    });

    if (slugExists) {
      throw new ForbiddenException('Cet article existe déjà!');
    }

    return await this.prisma.article.update({
      data: {
        titre: dto.titre,
        slug: updatedSlug,
      },
      where: {
        slug,
      },
    });
  }

  async updateIllustrationBySlug(
    slug: string,
    dto: UpdateIllustrationDto,
  ): Promise<UpdatePost> {
    const postBySlug = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!postBySlug) {
      throw new ForbiddenException("Cet illustration d'article n'existe pas!");
    }

    if (fs.existsSync(`./images/${postBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${postBySlug.illustration}`);
    }

    return await this.prisma.article.update({
      data: {
        illustration: dto.illustration,
      },
      where: {
        slug,
      },
    });
  }

  async deletePostBySlug(slug: string): Promise<UpdatePost> {
    const postBySlug = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!postBySlug) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    if (fs.existsSync(`./images/${postBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${postBySlug.illustration}`);
    }

    return await this.prisma.article.delete({
      where: {
        slug,
      },
    });
  }

  async updateStateBySlug(
    slug: string,
    dto: UpdateStateDto,
  ): Promise<UpdateStatePost> {
    const postBySlug = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!postBySlug) {
      throw new ForbiddenException("Cet article n'existe pas!");
    }

    return await this.prisma.article.update({
      data: {
        etat: Number(dto.etat),
      },
      where: {
        slug,
      },
      select: {
        id: true,
        etat_article: {
          select: {
            id: true,
            nomEtat: true,
          },
        },
      },
    });
  }
}
