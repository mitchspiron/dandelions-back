import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from '../common/decorators';
import { PostCategoryDto } from './dto';
import { PostCategoryService } from './post-category.service';
import { PostCategory } from './types';

@Controller('post-category')
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @Public()
  @Get()
  async getPostCategory(): Promise<PostCategory[]> {
    return await this.postCategoryService.getPostCategory();
  }

  @Public()
  @Get('/:id')
  async getPostCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostCategory> {
    return await this.postCategoryService.getPostCategoryById(id);
  }

  @Public()
  @Get('/post/:slug')
  async getCategoryBySlug(@Param('slug') slug: string): Promise<PostCategory> {
    return await this.postCategoryService.getCategoryBySlug(slug);
  }

  @Post()
  async createPostCategory(
    @Body() dto: PostCategoryDto,
  ): Promise<PostCategory> {
    return await this.postCategoryService.createPostCategory(dto);
  }

  @Put('/:id')
  async updatePostCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostCategoryDto,
  ): Promise<PostCategory> {
    return await this.postCategoryService.updatePostCategoryById(id, dto);
  }

  @Delete('/:id')
  async deletePostCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostCategory> {
    return await this.postCategoryService.deletePostCategoryById(id);
  }
}
