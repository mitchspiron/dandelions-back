import { PrismaService } from '../prisma/prisma.service';
import { UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersInfo, UsersPassword } from './types';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsersById(id: number): Promise<Users>;
    getUsers(): Promise<Users[]>;
    createUsers(dto: UsersDto): Promise<Users>;
    updateUsersInfoById(id: number, dto: UsersInfoDto): Promise<UsersInfo>;
    updateUsersPasswordById(id: number, dto: UsersPasswordDto): Promise<UsersPassword>;
    deleteUsersById(id: number): Promise<Users>;
    hashData(data: string): Promise<string>;
}
