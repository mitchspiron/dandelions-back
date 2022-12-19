/// <reference types="multer" />
import { FilterUserseDto, UpdateIllustrationDto, UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersCreate, UsersInfoWithToken, UsersPassword, UserTokenWithoutPassword } from './types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    uploadedFile(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
    }>;
    getUsers(): Promise<Users[]>;
    filterUsers(dto: FilterUserseDto): Promise<Users[]>;
    getUsersById(id: number): Promise<Users>;
    createUsers(dto: UsersDto): Promise<UsersCreate>;
    updateUsersInfoById(id: number, dto: UsersInfoDto): Promise<UserTokenWithoutPassword>;
    updateIllustrationById(id: number, dto: UpdateIllustrationDto): Promise<UsersInfoWithToken>;
    updateUsersPasswordById(id: number, dto: UsersPasswordDto): Promise<UsersPassword>;
    deleteUsersById(id: number): Promise<Users>;
}
