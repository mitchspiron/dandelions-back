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
import { UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersInfo, UsersPassword } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  async getUsersById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.getUsersById(id);
  }

  @Post()
  async createUsers(@Body() dto: UsersDto): Promise<Users> {
    return await this.usersService.createUsers(dto);
  }

  @Put('/info/:id')
  async updateUsersInfoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UsersInfoDto,
  ): Promise<UsersInfo> {
    return await this.usersService.updateUsersInfoById(id, dto);
  }

  @Put('/password/:id')
  async updateUsersPasswordById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UsersPasswordDto,
  ): Promise<UsersPassword> {
    return await this.usersService.updateUsersPasswordById(id, dto);
  }

  @Delete('/:id')
  async deleteUsersById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.deleteUsersById(id);
  }
}
