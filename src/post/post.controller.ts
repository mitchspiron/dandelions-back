import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  FilterCategoryByPostDto,
  FilterPostsDto,
  FilterPostsVisitorDto,
  SwitchRecommandedDto,
  SwitchTopDto,
  UpdateIllustrationDto,
  UpdatePostDto,
  UpdateStateDto,
} from './dto';
import { PostService } from './post.service';
import {
  CreatePost,
  GetPost,
  GetPostWithoutContent,
  SwitchRecommanded,
  SwitchTop,
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

  @Put('switch-top/:slug')
  async switchTopBySlug(
    @Param('slug') slug: string,
    @Body() dto: SwitchTopDto,
  ): Promise<SwitchTop> {
    return await this.postService.switchTopBySlug(slug, dto);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<CreatePost> {
    return await this.postService.createPost(dto);
  }

  @Public()
  @Get('admin/:id')
  async getPost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetPostWithoutContent[]> {
    return await this.postService.getPost(id);
  }

  @Public()
  @Post('/filter')
  async filterPostVisitor(
    @Body() dto: FilterPostsVisitorDto,
  ): Promise<GetPost[]> {
    return await this.postService.filterPostVisitor(dto);
  }

  @Public()
  @Post('admin/filter/:id')
  async filterPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FilterPostsDto,
  ): Promise<GetPost[]> {
    return await this.postService.filterPost(id, dto);
  }

  @Public()
  @Get('take-first-post')
  async takeFirstLastestPost(): Promise<GetPostWithoutContent[]> {
    return await this.postService.takeFirstLastestPost();
  }

  @Public()
  @Get('skip-first-post')
  async skipFisrtLastestPost(): Promise<GetPostWithoutContent[]> {
    return await this.postService.skipFisrtLastestPost();
  }

  @Public()
  @Get('published')
  async getPublishedPost(): Promise<GetPostWithoutContent[]> {
    return await this.postService.getPublishedPost();
  }

  @Public()
  @Get('published/:slug')
  async getPublishedPostBySlug(
    @Param('slug') slug: string,
  ): Promise<GetPostWithoutContent[]> {
    return await this.postService.getPublishedPostBySlug(slug);
  }

  @Public()
  @Post('published/filter/:slug')
  async filterPublishedPostBySlug(
    @Param('slug') slug: string,
    @Body() dto: FilterCategoryByPostDto,
  ): Promise<GetPost[]> {
    return await this.postService.filterPublishedPostBySlug(slug, dto);
  }

  @Public()
  @Get('recommanded')
  async getRecommandedPost(): Promise<GetPostWithoutContent[]> {
    return await this.postService.getRecommandedPost();
  }

  @Public()
  @Get('top')
  async getTopPost(): Promise<GetPostWithoutContent[]> {
    return await this.postService.getTopPost();
  }

  @Public()
  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<GetPost> {
    return await this.postService.getPostBySlug(slug);
  }

  @Put(':slug/:id')
  async updatePostBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ): Promise<UpdatePost> {
    return await this.postService.updatePostBySlug(slug, id, dto);
  }

  @Put('update-illustration/:slug/:id')
  async updateIllustrationBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<UpdatePost> {
    return await this.postService.updateIllustrationBySlug(slug, id, dto);
  }

  @Delete(':slug/:id')
  async deletePostBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdatePost> {
    return await this.postService.deletePostBySlug(slug, id);
  }
}
