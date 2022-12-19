import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCategoryDto } from './dto';
import { PostCategory } from './types';

@Injectable()
export class PostCategoryService {
  constructor(private prisma: PrismaService) {}

  async getPostCategoryById(id: number): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.findUnique({
      where: {
        id,
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return PostCategoryById;
  }

  async getCategoryBySlug(slug: string): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        nomCategorie: true,
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return PostCategoryById;
  }

  async getPostCategory(): Promise<PostCategory[]> {
    const postCategory = await this.prisma.categorie_article.findMany({
      include: {
        _count: {
          select: {
            article: true,
          },
        },
      },
    });

    if (!postCategory)
      throw new ForbiddenException("Il n'y a aucun categorie d'article!");
    return postCategory;
  }

  async createPostCategory(dto: PostCategoryDto): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.findMany({
      where: {
        nomCategorie: dto.nomCategorie,
      },
    });

    if (PostCategoryById.length !== 0) {
      throw new ForbiddenException("Cette catégorie d'article existe déjà!");
    }

    const slug = dto.nomCategorie
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    return await this.prisma.categorie_article.create({
      data: {
        nomCategorie: dto.nomCategorie,
        slug,
      },
    });
  }

  async updatePostCategoryById(
    id: number,
    dto: PostCategoryDto,
  ): Promise<PostCategory> {
    const slug = dto.nomCategorie
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const PostCategoryBySlug = await this.prisma.categorie_article.findUnique({
      where: {
        slug,
      },
    });

    if (PostCategoryBySlug) {
      throw new ForbiddenException("Cette catégorie d'article existe déjà!");
    }

    return await this.prisma.categorie_article.update({
      data: {
        nomCategorie: dto.nomCategorie,
        slug,
      },
      where: {
        id,
      },
    });
  }

  async deletePostCategoryById(id: number): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.findUnique({
      where: {
        id,
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");

    return await this.prisma.categorie_article.delete({
      where: {
        id,
      },
    });
  }
}
