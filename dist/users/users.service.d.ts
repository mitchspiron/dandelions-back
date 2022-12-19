import { PrismaService } from '../prisma/prisma.service';
import { FilterUserseDto, UpdateIllustrationDto, UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersCreate, UsersInfoWithToken, UsersPassword, UserTokenWithoutPassword } from './types';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../auth-user/types';
export declare class UsersService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getUsersById(id: number): Promise<Users>;
    getUsers(): Promise<Users[]>;
    filterUsers(dto: FilterUserseDto): Promise<Users[]>;
    createUsers(dto: UsersDto): Promise<UsersCreate>;
    updateUsersInfoById(id: number, dto: UsersInfoDto): Promise<UserTokenWithoutPassword>;
    updateIllustrationById(id: number, dto: UpdateIllustrationDto): Promise<UsersInfoWithToken>;
    updateUsersPasswordById(id: number, dto: UsersPasswordDto): Promise<UsersPassword>;
    deleteUsersById(id: number): Promise<Users>;
    getToken(idUser: number, emailUser: string, nomUser: string, prenomUser: string, roleUser: number, illustrationUser: string, telephoneUser: string, aProposUser: string): Promise<Token>;
    hashData(data: string): Promise<string>;
}
