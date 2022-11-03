import { PrismaService } from '../prisma/prisma.service';
import { AuthUserDtoSignin, AuthUserDtoSignup } from './dto';
import { Token, User, UserToken } from './types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';
export declare class AuthUserService {
    private prisma;
    private jwtService;
    private mailService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    signup(dto: AuthUserDtoSignup): Promise<void>;
    confirm(data: any, res: any, req: any): Promise<User>;
    signin(dto: AuthUserDtoSignin): Promise<UserToken>;
    hashData(data: string): Promise<string>;
    getToken(idUser: number, emailUser: string): Promise<Token>;
}
