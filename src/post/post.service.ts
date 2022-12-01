import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePostDto,
  FilterPostsDto,
  SwitchRecommandedDto,
  SwitchTopDto,
  UpdateIllustrationDto,
  UpdatePostDto,
  UpdateStateDto,
} from './dto';
import {
  CreatePost,
  GetPost,
  SwitchRecommanded,
  SwitchTop,
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

  async getPost(id: number): Promise<GetPost[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    } else if (user.role !== 1) {
      const post = await this.prisma.article.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          idRedacteur: Number(id),
        },
        select: {
          id: true,
          utilisateur: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              role: true,
            },
          },
          categorie_article: {
            select: {
              id: true,
              nomCategorie: true,
              slug: true,
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

    const post = await this.prisma.article.findMany({
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
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async filterPost(id: number, dto: FilterPostsDto): Promise<GetPost[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    } else if (user.role !== 1) {
      const post = await this.prisma.article.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          idRedacteur: Number(id),
          AND: [
            {
              titre: {
                contains: dto.searchkey,
              },
            },
            {
              categorie_article: {
                nomCategorie: {
                  contains: dto.searchCategory,
                },
              },
            },
            {
              etat_article: {
                nomEtat: {
                  contains: dto.searchEtat,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          utilisateur: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              role: true,
            },
          },
          categorie_article: {
            select: {
              id: true,
              nomCategorie: true,
              slug: true,
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

    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        AND: [
          {
            titre: {
              contains: dto.searchkey,
            },
          },
          {
            categorie_article: {
              nomCategorie: {
                contains: dto.searchCategory,
              },
            },
          },
          {
            etat_article: {
              nomEtat: {
                contains: dto.searchEtat,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async takeFirstLastestPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
      },
      take: 1,
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async skipFisrtLastestPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
      },
      skip: 1,
      take: 4,
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async getPublishedPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async getPublishedPostBySlug(slug: string): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
        categorie_article: {
          slug,
        },
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async getRecommandedPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
        recommadee: true,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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

  async getTopPost(): Promise<GetPost[]> {
    const post = await this.prisma.article.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        etat: 5,
        top: true,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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
            role: true,
          },
        },
        categorie_article: {
          select: {
            id: true,
            nomCategorie: true,
            slug: true,
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
    id: number,
    dto: UpdatePostDto,
  ): Promise<UpdatePost> {
    const post = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (!post) {
      throw new ForbiddenException("L'article n'éxiste pas!");
    } else {
      const updatedSlug = dto.titre
        .toLocaleLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .trim()
        .split(' ')
        .join('-');

      const titrePostExist = await this.prisma.article.findUnique({
        where: {
          slug: updatedSlug,
        },
      });

      if (titrePostExist && slug !== updatedSlug) {
        throw new ForbiddenException("Ce titre d'article existe déja!");
      }

      const redacteur = await this.prisma.utilisateur.findUnique({
        where: {
          id,
        },
        include: {
          role_utilisateur: {
            select: {
              id: true,
            },
          },
        },
      });

      if (post.idRedacteur !== id && redacteur?.role_utilisateur?.id !== 1) {
        throw new ForbiddenException("Cette article n'est pas la votre!");
      }

      return await this.prisma.article.update({
        data: {
          titre: dto.titre,
          idCategorie: Number(dto.idCategorie),
          description: dto.description,
          contenu: dto.contenu,
          slug: updatedSlug,
        },
        where: {
          slug,
        },
      });
    }
  }

  async updateIllustrationBySlug(
    slug: string,
    id: number,
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

    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      postBySlug.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cette article n'est pas la votre!");
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

  async deletePostBySlug(slug: string, id: number): Promise<UpdatePost> {
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

    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      postBySlug.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cette article n'est pas la votre!");
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

  async switchToRecommandedBySlug(
    slug: string,
    dto: SwitchRecommandedDto,
  ): Promise<SwitchRecommanded> {
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
        recommadee: dto.recommadee,
      },
      where: {
        slug,
      },
      select: {
        id: true,
        recommadee: true,
      },
    });
  }

  async switchTopBySlug(slug: string, dto: SwitchTopDto): Promise<SwitchTop> {
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
        top: dto.top,
      },
      where: {
        slug,
      },
      select: {
        id: true,
        top: true,
      },
    });
  }
}
