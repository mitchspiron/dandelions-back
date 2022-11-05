import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnterpriseDto } from './dto';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './types';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get()
  async getEnterprise(): Promise<Enterprise[]> {
    return await this.enterpriseService.getEnterprise();
  }

  @Get('/:slug')
  async getEnterpriseBySlug(@Param('slug') id: string): Promise<Enterprise> {
    return await this.enterpriseService.getEnterpriseBySlug(id);
  }

  @Post()
  async createEnterprise(@Body() dto: EnterpriseDto): Promise<Enterprise> {
    return await this.enterpriseService.createEnterprise(dto);
  }

  @Put('/:slug')
  async updateEnterpriseBySlug(
    @Param('slug') slug: string,
    @Body() dto: EnterpriseDto,
  ): Promise<Enterprise> {
    return await this.enterpriseService.updateEnterpriseBySlug(slug, dto);
  }

  @Delete('/:slug')
  async deleteEnterpriseBySlug(
    @Param('slug') slug: string,
  ): Promise<Enterprise> {
    return await this.enterpriseService.deleteEnterpriseBySlug(slug);
  }
}
