import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';
import { CreatePost, GetPost, UpdatePost } from './types/post.type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(dto);
  }

  @Get()
  async getPost(): Promise<GetPost[]> {
    return await this.postService.getPost();
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<GetPost> {
    return await this.postService.getPostBySlug(slug);
  }

  @Put(':slug')
  async updatePostBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdatePostDto,
  ): Promise<UpdatePost> {
    return await this.postService.updatePostBySlug(slug, dto);
  }

  @Delete(':slug')
  async deletePostBySlug(@Param('slug') slug: string): Promise<UpdatePost> {
    return await this.postService.deletePostBySlug(slug);
  }
}
