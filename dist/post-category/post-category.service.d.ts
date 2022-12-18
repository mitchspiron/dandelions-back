import { PrismaService } from '../prisma/prisma.service';
import { PostCategoryDto } from './dto';
import { PostCategory } from './types';
export declare class PostCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getPostCategoryById(id: number): Promise<PostCategory>;
    getCategoryBySlug(slug: string): Promise<PostCategory>;
    getPostCategory(): Promise<PostCategory[]>;
    createPostCategory(dto: PostCategoryDto): Promise<PostCategory>;
    updatePostCategoryById(id: number, dto: PostCategoryDto): Promise<PostCategory>;
    deletePostCategoryById(id: number): Promise<PostCategory>;
}
