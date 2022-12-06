/// <reference types="multer" />
import { CreatePostDto, FilterCategoryByPostDto, FilterPostsDto, FilterPostsVisitorDto, SwitchRecommandedDto, SwitchTopDto, UpdateIllustrationDto, UpdatePostDto, UpdateStateDto } from './dto';
import { PostService } from './post.service';
import { CreatePost, GetPost, GetPostWithoutContent, SwitchRecommanded, SwitchTop, UpdatePost, UpdateStatePost } from './types/post.type';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    uploadedFile(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
    }>;
    updateStateBySlug(slug: string, dto: UpdateStateDto): Promise<UpdateStatePost>;
    switchToRecommandedBySlug(slug: string, dto: SwitchRecommandedDto): Promise<SwitchRecommanded>;
    switchTopBySlug(slug: string, dto: SwitchTopDto): Promise<SwitchTop>;
    createPost(dto: CreatePostDto): Promise<CreatePost>;
    getPost(id: number): Promise<GetPostWithoutContent[]>;
    filterPostVisitor(dto: FilterPostsVisitorDto): Promise<GetPost[]>;
    filterPost(id: number, dto: FilterPostsDto): Promise<GetPost[]>;
    takeFirstLastestPost(): Promise<GetPostWithoutContent[]>;
    skipFisrtLastestPost(): Promise<GetPostWithoutContent[]>;
    getPublishedPost(): Promise<GetPostWithoutContent[]>;
    getPublishedPostBySlug(slug: string): Promise<GetPostWithoutContent[]>;
    filterPublishedPostBySlug(slug: string, dto: FilterCategoryByPostDto): Promise<GetPost[]>;
    getRecommandedPost(): Promise<GetPostWithoutContent[]>;
    getTopPost(): Promise<GetPostWithoutContent[]>;
    getPostBySlug(slug: string): Promise<GetPost>;
    updatePostBySlug(slug: string, id: number, dto: UpdatePostDto): Promise<UpdatePost>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<UpdatePost>;
    deletePostBySlug(slug: string, id: number): Promise<UpdatePost>;
}
