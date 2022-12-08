import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { Response, UnseenResponse } from './types';
export declare class ResponseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createResponse(id: number, dto: CreateResponseDto): Promise<Response>;
    getResponseByComment(id: number): Promise<Response[]>;
    getResponseById(id: number): Promise<Response>;
    getUnseenResponse(id: number): Promise<UnseenResponse[]>;
    updateResponseById(id: number, dto: UpdateResponseDto): Promise<Response>;
    updateResponseToSeen(id: number): Promise<Response>;
    deleteResponseById(id: number): Promise<Response>;
}
