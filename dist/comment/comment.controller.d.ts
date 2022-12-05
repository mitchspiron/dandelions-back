import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentdto } from './dto';
import { CreateComment, GetComment } from './types';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(slug: string, dto: CreateCommentDto): Promise<CreateComment>;
    getCommentByPost(slug: string): Promise<GetComment[]>;
    getCommentById(id: number): Promise<GetComment>;
    updateCommentById(id: number, dto: UpdateCommentdto): Promise<CreateComment>;
    deleteCommentById(id: number): Promise<CreateComment>;
}
