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
import { CreateComment, GetComment } from './types';

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

  @Get(':id')
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetComment> {
    return await this.commentService.getCommentById(id);
  }

  @Put(':id')
  async updateCommentById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentdto,
  ): Promise<CreateComment> {
    return await this.commentService.updateCommentById(id, dto);
  }

  @Delete(':id')
  async deleteCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateComment> {
    return await this.commentService.deleteCommentById(id);
  }
}
