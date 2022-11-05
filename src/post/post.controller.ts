import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { PostService } from './post.service';
import { CreatePost } from './types/post.type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(dto);
  }
}
