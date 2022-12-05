"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostCategoryService = class PostCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPostCategoryById(id) {
        const PostCategoryById = await this.prisma.categorie_article.findUnique({
            where: {
                id,
            },
        });
        if (!PostCategoryById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return PostCategoryById;
    }
    async getPostCategory() {
        const postCategory = await this.prisma.categorie_article.findMany({
            include: {
                _count: {
                    select: {
                        article: true,
                    },
                },
            },
        });
        if (!postCategory)
            throw new common_1.ForbiddenException("Il n'y a aucun categorie d'article!");
        return postCategory;
    }
    async createPostCategory(dto) {
        const PostCategoryById = await this.prisma.categorie_article.findMany({
            where: {
                nomCategorie: dto.nomCategorie,
            },
        });
        if (PostCategoryById.length !== 0) {
            throw new common_1.ForbiddenException("Cette catégorie d'article existe déjà!");
        }
        const slug = dto.nomCategorie
            .toLocaleLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .trim()
            .split(' ')
            .join('-');
        return await this.prisma.categorie_article.create({
            data: {
                nomCategorie: dto.nomCategorie,
                slug,
            },
        });
    }
    async updatePostCategoryById(id, dto) {
        const slug = dto.nomCategorie
            .toLocaleLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .trim()
            .split(' ')
            .join('-');
        const PostCategoryBySlug = await this.prisma.categorie_article.findUnique({
            where: {
                slug,
            },
        });
        if (PostCategoryBySlug) {
            throw new common_1.ForbiddenException("Cette catégorie d'article existe déjà!");
        }
        return await this.prisma.categorie_article.update({
            data: {
                nomCategorie: dto.nomCategorie,
                slug,
            },
            where: {
                id,
            },
        });
    }
    async deletePostCategoryById(id) {
        const PostCategoryById = await this.prisma.categorie_article.findUnique({
            where: {
                id,
            },
        });
        if (!PostCategoryById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return await this.prisma.categorie_article.delete({
            where: {
                id,
            },
        });
    }
};
PostCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostCategoryService);
exports.PostCategoryService = PostCategoryService;
//# sourceMappingURL=post-category.service.js.map