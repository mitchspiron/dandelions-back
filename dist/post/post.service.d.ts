import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, FilterCategoryByPostDto, FilterPostsDto, FilterPostsVisitorDto, SwitchRecommandedDto, SwitchTopDto, UpdateIllustrationDto, UpdatePostDto, UpdateStateDto } from './dto';
import { CreatePost, GetPost, GetPostWithoutContent, SwitchRecommanded, SwitchTop, UpdatePost, UpdateStatePost } from './types/post.type';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPost(dto: CreatePostDto): Promise<CreatePost>;
    getPost(id: number): Promise<GetPostWithoutContent[]>;
    filterPost(id: number, dto: FilterPostsDto): Promise<GetPost[]>;
    filterPostVisitor(dto: FilterPostsVisitorDto): Promise<GetPost[]>;
    takeFirstLastestPost(): Promise<GetPostWithoutContent[]>;
    skipFisrtLastestPost(): Promise<GetPostWithoutContent[]>;
    getPublishedPost(): Promise<GetPostWithoutContent[]>;
    getPublishedPostBySlug(slug: string): Promise<GetPost[]>;
    filterPublishedPostBySlug(slug: string, dto: FilterCategoryByPostDto): Promise<GetPost[]>;
    getRecommandedPost(): Promise<GetPostWithoutContent[]>;
    getTopPost(): Promise<GetPostWithoutContent[]>;
    getPostBySlug(slug: string): Promise<GetPost>;
    updatePostBySlug(slug: string, id: number, dto: UpdatePostDto): Promise<UpdatePost>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<UpdatePost>;
    deletePostBySlug(slug: string, id: number): Promise<UpdatePost>;
    updateStateBySlug(slug: string, dto: UpdateStateDto): Promise<UpdateStatePost>;
    switchToRecommandedBySlug(slug: string, dto: SwitchRecommandedDto): Promise<SwitchRecommanded>;
    switchTopBySlug(slug: string, dto: SwitchTopDto): Promise<SwitchTop>;
}
