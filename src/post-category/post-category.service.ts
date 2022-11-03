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
        id: Number(id),
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return PostCategoryById;
  }

  async getPostCategory(): Promise<PostCategory[]> {
    const postCategory = await this.prisma.categorie_article.findMany();

    if (!postCategory)
      throw new ForbiddenException("Il n'y a aucun categorie d'article!");
    return postCategory;
  }

  async createPostCategory(dto: PostCategoryDto): Promise<PostCategory> {
    return await this.prisma.categorie_article.create({
      data: {
        nomCategorie: dto.nomCategorie,
      },
    });
  }

  async updatePostCategoryById(
    id: number,
    dto: PostCategoryDto,
  ): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.update({
      data: {
        nomCategorie: dto.nomCategorie,
      },
      where: {
        id: Number(id),
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return PostCategoryById;
  }

  async deletePostCategoryById(id: number): Promise<PostCategory> {
    const PostCategoryById = await this.prisma.categorie_article.delete({
      where: {
        id: Number(id),
      },
    });

    if (!PostCategoryById)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return PostCategoryById;
  }
}
