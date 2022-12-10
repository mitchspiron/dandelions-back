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
exports.PostCategoryController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const dto_1 = require("./dto");
const post_category_service_1 = require("./post-category.service");
let PostCategoryController = class PostCategoryController {
    constructor(postCategoryService) {
        this.postCategoryService = postCategoryService;
    }
    async getPostCategory() {
        return await this.postCategoryService.getPostCategory();
    }
    async getPostCategoryById(id) {
        return await this.postCategoryService.getPostCategoryById(id);
    }
    async getCategoryBySlug(slug) {
        return await this.postCategoryService.getCategoryBySlug(slug);
    }
    async createPostCategory(dto) {
        return await this.postCategoryService.createPostCategory(dto);
    }
    async updatePostCategoryById(id, dto) {
        return await this.postCategoryService.updatePostCategoryById(id, dto);
    }
    async deletePostCategoryById(id) {
        return await this.postCategoryService.deletePostCategoryById(id);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "getPostCategory", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "getPostCategoryById", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/post/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "getCategoryBySlug", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PostCategoryDto]),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "createPostCategory", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.PostCategoryDto]),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "updatePostCategoryById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostCategoryController.prototype, "deletePostCategoryById", null);
PostCategoryController = __decorate([
    (0, common_1.Controller)('post-category'),
    __metadata("design:paramtypes", [post_category_service_1.PostCategoryService])
], PostCategoryController);
exports.PostCategoryController = PostCategoryController;
//# sourceMappingURL=post-category.controller.js.map