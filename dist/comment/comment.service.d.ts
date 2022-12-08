import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentdto } from './dto';
import { CommentToSeen, CreateComment, GetComment } from './types';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(slug: string, dto: CreateCommentDto): Promise<CreateComment>;
    getCommentByPost(slug: string): Promise<GetComment[]>;
    getUnseenComment(id: number): Promise<GetComment[]>;
    getCommentById(id: number): Promise<GetComment>;
    updateCommentById(id: number, dto: UpdateCommentdto): Promise<CreateComment>;
    updateCommentToSeen(id: number): Promise<CommentToSeen>;
    deleteCommentById(id: number): Promise<CreateComment>;
}
