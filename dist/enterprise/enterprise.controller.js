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
exports.EnterpriseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const decorators_1 = require("../common/decorators");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const dto_1 = require("./dto");
const enterprise_service_1 = require("./enterprise.service");
let EnterpriseController = class EnterpriseController {
    constructor(enterpriseService) {
        this.enterpriseService = enterpriseService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async getEnterprise() {
        return await this.enterpriseService.getEnterprise();
    }
    async filterEnterprise(dto) {
        return await this.enterpriseService.filterEnterprise(dto);
    }
    async getEnterpriseAdmin(id) {
        return await this.enterpriseService.getEnterpriseAdmin(id);
    }
    async filterEnterpriseAdmin(id, dto) {
        return await this.enterpriseService.filterEnterpriseAdmin(id, dto);
    }
    async getEnterpriseBySlug(id) {
        return await this.enterpriseService.getEnterpriseBySlug(id);
    }
    async createEnterprise(dto) {
        return await this.enterpriseService.createEnterprise(dto);
    }
    async isAbonneeBySlug(slug, dto) {
        return await this.enterpriseService.isAbonneeBySlug(slug, dto);
    }
    async updateEnterpriseBySlug(slug, id, dto) {
        return await this.enterpriseService.updateEnterpriseBySlug(slug, id, dto);
    }
    async updateIllustrationBySlug(slug, id, dto) {
        return await this.enterpriseService.updateIllustrationBySlug(slug, id, dto);
    }
    async deleteEnterpriseBySlug(slug, id) {
        return await this.enterpriseService.deleteEnterpriseBySlug(slug, id);
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
], EnterpriseController.prototype, "uploadedFile", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "getEnterprise", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterEnterpriseDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "filterEnterprise", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "getEnterpriseAdmin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/admin/filter/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.FilterEnterpriseDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "filterEnterpriseAdmin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "getEnterpriseBySlug", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EnterpriseDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "createEnterprise", null);
__decorate([
    (0, common_1.Put)('is-abonnee/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.isAbonneeDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "isAbonneeBySlug", null);
__decorate([
    (0, common_1.Put)('/:slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.EnterpriseUpdateDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "updateEnterpriseBySlug", null);
__decorate([
    (0, common_1.Put)('update-illustration/:slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.UpdateIllustrationDto]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "updateIllustrationBySlug", null);
__decorate([
    (0, common_1.Delete)('/:slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EnterpriseController.prototype, "deleteEnterpriseBySlug", null);
EnterpriseController = __decorate([
    (0, common_1.Controller)('enterprise'),
    __metadata("design:paramtypes", [enterprise_service_1.EnterpriseService])
], EnterpriseController);
exports.EnterpriseController = EnterpriseController;
//# sourceMappingURL=enterprise.controller.js.map