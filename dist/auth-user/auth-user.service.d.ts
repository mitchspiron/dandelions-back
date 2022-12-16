import { PrismaService } from '../prisma/prisma.service';
import { AuthUserDtoSignin, AuthUserDtoSignup, forgotPasswordDto, resetPasswordDto } from './dto';
import { Token, User, UserToken } from './types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';
import { Request, Response } from 'express';
export declare class AuthUserService {
    private prisma;
    private jwtService;
    private mailService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    signup(dto: AuthUserDtoSignup): Promise<void>;
    confirm(data: any, res: any, req: any): Promise<User>;
    signin(dto: AuthUserDtoSignin): Promise<UserToken>;
    decodeToken(req: Request): any;
    isLoggedIn(req: Request, res: Response): Promise<any>;
    forgotPassword(dto: forgotPasswordDto): Promise<void>;
    resetPassword(dto: resetPasswordDto, data: any): Promise<User>;
    hashData(data: string): Promise<string>;
    getToken(idUser: number, emailUser: string, nomUser: string, prenomUser: string, roleUser: number, illustrationUser: string, telephoneUser: string, aProposUser: string): Promise<Token>;
}
