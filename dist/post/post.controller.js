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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const decorators_1 = require("../common/decorators");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const dto_1 = require("./dto");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async updateStateBySlug(slug, dto) {
        return await this.postService.updateStateBySlug(slug, dto);
    }
    async switchToRecommandedBySlug(slug, dto) {
        return await this.postService.switchToRecommandedBySlug(slug, dto);
    }
    async switchTopBySlug(slug, dto) {
        return await this.postService.switchTopBySlug(slug, dto);
    }
    async createPost(dto) {
        return await this.postService.createPost(dto);
    }
    async getPost(id) {
        return await this.postService.getPost(id);
    }
    async filterPostVisitor(dto) {
        return await this.postService.filterPostVisitor(dto);
    }
    async filterPost(id, dto) {
        return await this.postService.filterPost(id, dto);
    }
    async takeFirstLastestPost() {
        return await this.postService.takeFirstLastestPost();
    }
    async skipFisrtLastestPost() {
        return await this.postService.skipFisrtLastestPost();
    }
    async getPublishedPost() {
        return await this.postService.getPublishedPost();
    }
    async getPublishedPostBySlug(slug) {
        return await this.postService.getPublishedPostBySlug(slug);
    }
    async filterPublishedPostBySlug(slug, dto) {
        return await this.postService.filterPublishedPostBySlug(slug, dto);
    }
    async getRecommandedPost() {
        return await this.postService.getRecommandedPost();
    }
    async getTopPost() {
        return await this.postService.getTopPost();
    }
    async getPostBySlug(slug) {
        return await this.postService.getPostBySlug(slug);
    }
    async updatePostBySlug(slug, id, dto) {
        return await this.postService.updatePostBySlug(slug, id, dto);
    }
    async updateIllustrationBySlug(slug, id, dto) {
        return await this.postService.updateIllustrationBySlug(slug, id, dto);
    }
    async deletePostBySlug(slug, id) {
        return await this.postService.deletePostBySlug(slug, id);
    }
};
__decorate([
    (0, common_1.Post)('upload-illustration'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './images',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Put)('state/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateStateDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updateStateBySlug", null);
__decorate([
    (0, common_1.Put)('switch-recommanded/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SwitchRecommandedDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "switchToRecommandedBySlug", null);
__decorate([
    (0, common_1.Put)('switch-top/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SwitchTopDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "switchTopBySlug", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPostsVisitorDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "filterPostVisitor", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('admin/filter/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.FilterPostsDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "filterPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('take-first-post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "takeFirstLastestPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('skip-first-post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "skipFisrtLastestPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('published'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPublishedPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('published/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPublishedPostBySlug", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('published/filter/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FilterCategoryByPostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "filterPublishedPostBySlug", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('recommanded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getRecommandedPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getTopPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Put)(':slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePostBySlug", null);
__decorate([
    (0, common_1.Put)('update-illustration/:slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.UpdateIllustrationDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updateIllustrationBySlug", null);
__decorate([
    (0, common_1.Delete)(':slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePostBySlug", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map