import { PostCategoryDto } from './dto';
import { PostCategoryService } from './post-category.service';
import { PostCategory } from './types';
export declare class PostCategoryController {
    private readonly postCategoryService;
    constructor(postCategoryService: PostCategoryService);
    getPostCategory(): Promise<PostCategory[]>;
    getPostCategoryById(id: number): Promise<PostCategory>;
    getCategoryBySlug(slug: string): Promise<PostCategory>;
    createPostCategory(dto: PostCategoryDto): Promise<PostCategory>;
    updatePostCategoryById(id: number, dto: PostCategoryDto): Promise<PostCategory>;
    deletePostCategoryById(id: number): Promise<PostCategory>;
}
