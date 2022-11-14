import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { CreateEvenementDto, UpdateEvenementDto, UpdateIllustrationDto } from './dto';
import { EvenementService } from './evenement.service';
import { CreateEvenement, GetEvenement } from './types';

@Controller('evenement')
export class EvenementController {
  constructor(private readonly evenementService: EvenementService) {}

  @Post('upload-illustration')
  @UseInterceptors(
    FileInterceptor('image', {
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
  async createEvenement(@Body() dto: CreateEvenementDto): Promise<CreateEvenement> {
    return await this.evenementService.createEvenement(dto);
  }

  @Get()
  async getEvenement(): Promise<GetEvenement[]> {
    return await this.evenementService.getEvenement();
  }

  @Get(':slug')
  async getEvenementBySlug(@Param('slug') slug: string): Promise<GetEvenement> {
    return await this.evenementService.getEvenementBySlug(slug);
  }

  @Put(':slug')
  async updateEvenementBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdateEvenementDto,
  ): Promise<CreateEvenement> {
    return await this.evenementService.updateEvenementBySlug(slug, dto);
  }

  @Put('update-illustration/:slug')
  async updateIllustrationBySlug(
    @Param('slug') slug: string,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<CreateEvenement> {
    return await this.evenementService.updateIllustrationBySlug(slug, dto);
  }

  @Delete(':slug')
  async deletePostBySlug(@Param('slug') slug: string): Promise<CreateEvenement> {
    return await this.evenementService.deleteEvenementBySlug(slug);
  }
}
