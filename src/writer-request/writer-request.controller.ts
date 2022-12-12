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
import { WriterRequestDto } from './dto';
import { WriterRequest } from './types';
import { WriterRequestService } from './writer-request.service';

@Controller('writer-request')
export class WriterRequestController {
  constructor(private readonly writerRequest: WriterRequestService) {}

  @Post()
  async createWriterRequest(
    @Body() dto: WriterRequestDto,
  ): Promise<WriterRequest> {
    return this.writerRequest.createWriterRequest(dto);
  }

  @Get()
  async getWriterRequest(): Promise<WriterRequest[]> {
    return this.writerRequest.getWriterRequest();
  }

  @Put(':id/:user')
  async acceptWriterRequest(
    @Param('id', ParseIntPipe) id: number,
    @Param('user', ParseIntPipe) user: number,
  ) {
    return this.writerRequest.acceptWriterRequest(id, user);
  }

  @Delete(':id')
  async declineWriterRequest(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WriterRequest> {
    return this.writerRequest.declineWriterRequest(id);
  }
}
