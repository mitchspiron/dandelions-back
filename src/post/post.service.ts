import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CreatePost, GetPost, UpdatePost } from './types/post.type';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(dto: CreatePostDto): Promise<CreatePost> {
    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id: dto.idRedacteur,
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
        id: dto.idCategorie,
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
        idRedacteur: dto.idRedacteur,
        idCategorie: dto.idCategorie,
        titre: dto.titre,
        slug,
        description: dto.description,
        illustration: dto.illustration,
        contenu: dto.contenu,
        top: false,
        recommadee: false,
        isPublier: false,
      },
    });
  }

  async getPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      select: {
        id: true,
        idRedacteur: true,
        idCategorie: true,
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        top: true,
        recommadee: true,
        isPublier: true,
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
        idRedacteur: true,
        idCategorie: true,
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        top: true,
        recommadee: true,
        isPublier: true,
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

    return postBySlug
  }

  async updatePostBySlug(slug: string, dto: UpdatePostDto): Promise<UpdatePost>{
    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if(!slugExists){
      throw new ForbiddenException("Cet article n'existe pas!");
    }
    const updatedSlug = dto.titre
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    return await this.prisma.article.update({
      data: {
        idCategorie: dto.idCategorie,
        titre: dto.titre,
        illustration: dto.illustration,
        description: dto.description,
        contenu: dto.contenu,
        slug: updatedSlug
      },
      where: {
        slug
      }
    })
  }

  async deletePostBySlug(slug: string): Promise<UpdatePost> {
    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if(!slugExists){
      throw new ForbiddenException("Cet article n'existe pas!");
    }
    
    return await this.prisma.article.delete({
      where: {
        slug
      }
    })
  }
}
