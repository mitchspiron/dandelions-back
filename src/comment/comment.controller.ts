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
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentdto } from './dto';
import { CommentToSeen, CreateComment, GetComment } from './types';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':slug')
  async createComment(
    @Param('slug') slug: string,
    @Body() dto: CreateCommentDto,
  ): Promise<CreateComment> {
    return await this.commentService.createComment(slug, dto);
  }

  @Public()
  @Get('post/:slug')
  async getCommentByPost(@Param('slug') slug: string): Promise<GetComment[]> {
    return await this.commentService.getCommentByPost(slug);
  }

  @Public()
  @Get(':id')
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetComment> {
    return await this.commentService.getCommentById(id);
  }

  @Get('/unseen/:id')
  async getUnseenComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetComment[]> {
    return await this.commentService.getUnseenComment(id);
  }

  @Put(':id')
  async updateCommentById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentdto,
  ): Promise<CreateComment> {
    return await this.commentService.updateCommentById(id, dto);
  }

  @Put('/to-seen/:id')
  async updateCommentToSeen(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentToSeen> {
    return await this.commentService.updateCommentToSeen(id);
  }

  @Delete(':id')
  async deleteCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateComment> {
    return await this.commentService.deleteCommentById(id);
  }
}
