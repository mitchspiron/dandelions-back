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
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { ResponseService } from './response.service';
import { Response } from './types';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post(':id')
  async createResponse(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateResponseDto,
  ): Promise<Response> {
    return await this.responseService.createResponse(id, dto);
  }

  @Public()
  @Get('comment/:id')
  async getResponseByComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response[]> {
    return await this.responseService.getResponseByComment(id);
  }

  @Public()
  @Get(':id')
  async getResponseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response> {
    return await this.responseService.getResponseById(id);
  }

  @Put(':id')
  async updateResponseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResponseDto,
  ): Promise<Response> {
    return await this.responseService.updateResponseById(id, dto);
  }

  @Delete(':id')
  async deleteResponseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response> {
    return await this.responseService.deleteResponseById(id);
  }
}
