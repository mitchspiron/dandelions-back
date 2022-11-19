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
import {
  CreatePostDto,
  SwitchRecommandedDto,
  UpdateIllustrationDto,
  UpdatePostDto,
  UpdatePostTitleDto,
  UpdateStateDto,
} from './dto';
import { PostService } from './post.service';
import {
  CreatePost,
  GetPost,
  SwitchRecommanded,
  UpdatePost,
  UpdateStatePost,
} from './types/post.type';

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
  @Get('category')
  async getPublishedPostCategory() {
    return await this.postService.getPublishedPostCategory();
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

  @Put('title/:slug')
  async updatePostTitleBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdatePostTitleDto,
  ): Promise<UpdatePost> {
    return await this.postService.updatePostTitleBySlug(slug, dto);
  }

  @Put('state/:slug')
  async updateStateBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdateStateDto,
  ): Promise<UpdateStatePost> {
    return await this.postService.updateStateBySlug(slug, dto);
  }

  @Put('switch-recommanded/:slug')
  async switchToRecommandedBySlug(
    @Param('slug') slug: string,
    @Body() dto: SwitchRecommandedDto,
  ): Promise<SwitchRecommanded> {
    return await this.postService.switchToRecommandedBySlug(slug, dto);
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
