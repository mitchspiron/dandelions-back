import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostCategory } from 'src/post-category/types';
import { CreatePostDto } from './dto';
import { PostService } from './post.service';
import { CreatePost, GetPost } from './types/post.type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(dto);
  }

  @Get()
  async getPost(): Promise<GetPost[]>{
    return await this.postService.getPost();
  }
}
