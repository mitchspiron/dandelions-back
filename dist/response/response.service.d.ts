import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { Response } from './types';
export declare class ResponseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createResponse(id: number, dto: CreateResponseDto): Promise<Response>;
    getResponseByComment(id: number): Promise<Response[]>;
    getResponseById(id: number): Promise<Response>;
    updateResponseById(id: number, dto: UpdateResponseDto): Promise<Response>;
    deleteResponseById(id: number): Promise<Response>;
}
