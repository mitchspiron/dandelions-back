import { Body, Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators';
import { DashboardService } from './dashboard.service';
import { DashboardYearDto } from './dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/chart/users')
  async getAllCountUserByYear(@Body() dto: DashboardYearDto) {
    return await this.dashboardService.getAllCountUserByYear(dto);
  }

  @Post('/chart/enterprises')
  async getAllCountEnterpriseByYear(@Body() dto: DashboardYearDto) {
    return await this.dashboardService.getAllCountEnterpriseByYear(dto);
  }

  @Post('/chart/posts')
  async getAllCountPostByYear(@Body() dto: DashboardYearDto) {
    return await this.dashboardService.getAllCountPostByYear(dto);
  }

  @Post('/chart/events')
  async getAllCountEventByYear(@Body() dto: DashboardYearDto) {
    return await this.dashboardService.getAllCountEventByYear(dto);
  }

  @Get('/count/users')
  async getAllCountUsers() {
    return await this.dashboardService.getAllCountUsers();
  }

  @Get('/count/enterprises')
  async getAllCountEnterprises() {
    return await this.dashboardService.getAllCountEnterprises();
  }

  @Get('/count/posts')
  async getAllCountPosts() {
    return await this.dashboardService.getAllCountPosts();
  }

  @Get('/count/events')
  async getAllCountEvents() {
    return await this.dashboardService.getAllCountEvents();
  }
}
