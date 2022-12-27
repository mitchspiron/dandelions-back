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
  CreateEvenementDto,
  FilterEvenementDto,
  SwitchIsArchivedDto,
  SwitchOnHeaderDto,
  SwitchOnSubscribeDto,
  UpdateEvenementDto,
  UpdateIllustrationDto,
} from './dto';
import { EvenementService } from './evenement.service';
import {
  CreateEvenement,
  GetEvenement,
  SwitchIsArchived,
  SwitchOnHeader,
  SwitchOnSubscribe,
} from './types';

@Controller('evenement')
export class EvenementController {
  constructor(private readonly evenementService: EvenementService) {}

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
  async createEvenement(
    @Body() dto: CreateEvenementDto,
  ): Promise<CreateEvenement> {
    return await this.evenementService.createEvenement(dto);
  }

  @Public()
  @Get()
  async getEvenement(): Promise<GetEvenement[]> {
    return await this.evenementService.getEvenement();
  }

  @Public()
  @Get('/on-header')
  async getEvenementOnHeader(): Promise<GetEvenement[]> {
    return await this.evenementService.getEvenementOnHeader();
  }

  @Public()
  @Post('filter')
  async filterEvenement(
    @Body() dto: FilterEvenementDto,
  ): Promise<GetEvenement[]> {
    return await this.evenementService.filterEvenement(dto);
  }

  @Public()
  @Get('four-last')
  async getThreeLastEvenement(): Promise<GetEvenement[]> {
    return await this.evenementService.getThreeLastEvenement();
  }

  @Put('switch-subscribed/:slug')
  async switchOnSubscribeBySlug(
    @Param('slug') slug: string,
    @Body() dto: SwitchOnSubscribeDto,
  ): Promise<SwitchOnSubscribe> {
    return await this.evenementService.switchOnSubscribeBySlug(slug, dto);
  }

  @Put('switch-header/:slug')
  async switchOnHeaderBySlug(
    @Param('slug') slug: string,
    @Body() dto: SwitchOnHeaderDto,
  ): Promise<SwitchOnHeader> {
    return await this.evenementService.switchOnHeaderBySlug(slug, dto);
  }

  @Put('switch-archived/:slug')
  async switchIsArchivedBySlug(
    @Param('slug') slug: string,
    @Body() dto: SwitchIsArchivedDto,
  ): Promise<SwitchIsArchived> {
    return await this.evenementService.switchIsArchivedBySlug(slug, dto);
  }

  @Put('update-illustration/:slug/:id')
  async updateIllustrationBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<CreateEvenement> {
    return await this.evenementService.updateIllustrationBySlug(slug, id, dto);
  }

  @Public()
  @Put('/archived-deadline')
  async updateArchivedById() {
    return await this.evenementService.updateArchivedById();
  }

  @Public()
  @Get('admin/:id')
  async getEvenementAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetEvenement[]> {
    return await this.evenementService.getEvenementAdmin(id);
  }

  @Public()
  @Get('/archived/admin/:id')
  async getEvenementArchivedAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetEvenement[]> {
    return await this.evenementService.getEvenementArchivedAdmin(id);
  }

  @Public()
  @Post('admin/filter/:id')
  async filterEvenementAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FilterEvenementDto,
  ): Promise<GetEvenement[]> {
    return await this.evenementService.filterEvenementAdmin(id, dto);
  }

  @Public()
  @Post('admin/filter/:id')
  async filterEvenementArchivedAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FilterEvenementDto,
  ): Promise<GetEvenement[]> {
    return await this.evenementService.filterEvenementArchivedAdmin(id, dto);
  }

  @Public()
  @Get(':slug')
  async getEvenementBySlug(@Param('slug') slug: string): Promise<GetEvenement> {
    return await this.evenementService.getEvenementBySlug(slug);
  }

  @Put(':slug/:id')
  async updateEvenementBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEvenementDto,
  ): Promise<CreateEvenement> {
    return await this.evenementService.updateEvenementBySlug(slug, id, dto);
  }

  @Delete(':slug/:id')
  async deleteEvenementBySlug(
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateEvenement> {
    return await this.evenementService.deleteEvenementBySlug(slug, id);
  }
}
