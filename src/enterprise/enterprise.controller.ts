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
  EnterpriseDto,
  EnterpriseUpdateDto,
  FilterEnterpriseDto,
  isAbonneeDto,
  UpdateIllustrationDto,
} from './dto';
import { EnterpriseService } from './enterprise.service';
import { Enterprise, isAbonnee } from './types';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

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

  @Public()
  @Get()
  async getEnterprise(): Promise<Enterprise[]> {
    return await this.enterpriseService.getEnterprise();
  }

  @Public()
  @Post('/filter')
  async filterEnterprise(
    @Body() dto: FilterEnterpriseDto,
  ): Promise<Enterprise[]> {
    return await this.enterpriseService.filterEnterprise(dto);
  }

  @Public()
  @Get('/admin/:id')
  async getEnterpriseAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Enterprise[]> {
    return await this.enterpriseService.getEnterpriseAdmin(id);
  }

  @Public()
  @Post('/admin/filter/:id')
  async filterEnterpriseAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FilterEnterpriseDto,
  ): Promise<Enterprise[]> {
    return await this.enterpriseService.filterEnterpriseAdmin(id, dto);
  }

  @Public()
  @Get('/:slug')
  async getEnterpriseBySlug(@Param('slug') id: string): Promise<Enterprise> {
    return await this.enterpriseService.getEnterpriseBySlug(id);
  }

  @Post()
  async createEnterprise(@Body() dto: EnterpriseDto): Promise<Enterprise> {
    return await this.enterpriseService.createEnterprise(dto);
  }

  @Put('is-abonnee/:slug')
  async isAbonneeBySlug(
    @Param('slug') slug: string,
    @Body() dto: isAbonneeDto,
  ): Promise<isAbonnee> {
    return await this.enterpriseService.isAbonneeBySlug(slug, dto);
  }

  @Put('/:slug/:id')
  async updateEnterpriseBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EnterpriseUpdateDto,
  ): Promise<Enterprise> {
    return await this.enterpriseService.updateEnterpriseBySlug(slug, id, dto);
  }

  @Put('update-illustration/:slug/:id')
  async updateIllustrationBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<Enterprise> {
    return await this.enterpriseService.updateIllustrationBySlug(slug, id, dto);
  }

  @Delete('/:slug/:id')
  async deleteEnterpriseBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Enterprise> {
    return await this.enterpriseService.deleteEnterpriseBySlug(slug, id);
  }
}
