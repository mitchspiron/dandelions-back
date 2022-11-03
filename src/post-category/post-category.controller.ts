import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostCategoryDto } from './dto';
import { PostCategoryService } from './post-category.service';
import { PostCategory } from './types';

@Controller('post-category')
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @Get()
  async getPostCategory(): Promise<PostCategory[]> {
    return await this.postCategoryService.getPostCategory();
  }

  @Get('/:id')
  async getPostCategoryById(@Param('id') id: number): Promise<PostCategory> {
    return await this.postCategoryService.getPostCategoryById(id);
  }

  @Post()
  async createPostCategory(
    @Body() dto: PostCategoryDto,
  ): Promise<PostCategory> {
    return await this.postCategoryService.createPostCategory(dto);
  }

  @Put('/:id')
  async updatePostCategoryById(
    @Param('id') id: number,
    @Body() dto: PostCategoryDto,
  ): Promise<PostCategory> {
    return await this.postCategoryService.updatePostCategoryById(id, dto);
  }

  @Delete('/:id')
  async deletePostCategoryById(@Param('id') id: number): Promise<PostCategory> {
    return await this.postCategoryService.deletePostCategoryById(id);
  }
}
