import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from '../common/decorators';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { CreatePostDto, UpdateIllustrationDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';
import { CreatePost, GetPost, UpdatePost } from './types/post.type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload-illustration')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(dto);
  }

  @Public()
  @Get()
  async getPost(): Promise<GetPost[]> {
    return await this.postService.getPost();
  }

  @Public()
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

  @Put('update-illustration/:slug')
  async updateIllustrationBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<UpdatePost> {
    return await this.postService.updateIllustrationBySlug(slug, dto);
  }

  @Delete(':slug')
  async deletePostBySlug(@Param('slug') slug: string): Promise<UpdatePost> {
    return await this.postService.deletePostBySlug(slug);
  }
}
