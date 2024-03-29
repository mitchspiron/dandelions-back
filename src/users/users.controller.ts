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
  FilterUserseDto,
  UpdateIllustrationDto,
  UsersDto,
  UsersInfoDto,
  UsersPasswordDto,
} from './dto';
import {
  Users,
  UsersCreate,
  UsersInfoWithToken,
  UsersPassword,
  UserTokenWithoutPassword,
} from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.usersService.getUsers();
  }

  @Public()
  @Post('/filter')
  async filterUsers(@Body() dto: FilterUserseDto): Promise<Users[]> {
    return await this.usersService.filterUsers(dto);
  }

  @Get('/:id')
  async getUsersById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.getUsersById(id);
  }

  @Post()
  async createUsers(@Body() dto: UsersDto): Promise<UsersCreate> {
    return await this.usersService.createUsers(dto);
  }

  @Put('/info/:id')
  async updateUsersInfoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UsersInfoDto,
  ): Promise<UserTokenWithoutPassword> {
    return await this.usersService.updateUsersInfoById(id, dto);
  }

  @Put('update-illustration/:id')
  async updateIllustrationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIllustrationDto,
  ): Promise<UsersInfoWithToken> {
    return await this.usersService.updateIllustrationById(id, dto);
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
