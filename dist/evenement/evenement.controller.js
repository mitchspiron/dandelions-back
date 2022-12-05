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
exports.EvenementController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const decorators_1 = require("../common/decorators");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const dto_1 = require("./dto");
const evenement_service_1 = require("./evenement.service");
let EvenementController = class EvenementController {
    constructor(evenementService) {
        this.evenementService = evenementService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async createEvenement(dto) {
        return await this.evenementService.createEvenement(dto);
    }
    async getEvenement() {
        return await this.evenementService.getEvenement();
    }
    async getEvenementOnHeader() {
        return await this.evenementService.getEvenementOnHeader();
    }
    async filterEvenement(dto) {
        return await this.evenementService.filterEvenement(dto);
    }
    async getFourLastEvenement() {
        return await this.evenementService.getFourLastEvenement();
    }
    async switchOnSubscribeBySlug(slug, dto) {
        return await this.evenementService.switchOnSubscribeBySlug(slug, dto);
    }
    async switchOnHeaderBySlug(slug, dto) {
        return await this.evenementService.switchOnHeaderBySlug(slug, dto);
    }
    async updateIllustrationBySlug(slug, id, dto) {
        return await this.evenementService.updateIllustrationBySlug(slug, id, dto);
    }
    async getEvenementAdmin(id) {
        return await this.evenementService.getEvenementAdmin(id);
    }
    async filterEvenementAdmin(id, dto) {
        return await this.evenementService.filterEvenementAdmin(id, dto);
    }
    async getEvenementBySlug(slug) {
        return await this.evenementService.getEvenementBySlug(slug);
    }
    async updateEvenementBySlug(slug, id, dto) {
        return await this.evenementService.updateEvenementBySlug(slug, id, dto);
    }
    async deletePostBySlug(slug, id) {
        return await this.evenementService.deleteEvenementBySlug(slug, id);
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
], EvenementController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEvenementDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "createEvenement", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "getEvenement", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/on-header'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "getEvenementOnHeader", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterEvenementDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "filterEvenement", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('four-last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "getFourLastEvenement", null);
__decorate([
    (0, common_1.Put)('switch-subscribed/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SwitchOnSubscribeDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "switchOnSubscribeBySlug", null);
__decorate([
    (0, common_1.Put)('switch-header/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SwitchOnHeaderDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "switchOnHeaderBySlug", null);
__decorate([
    (0, common_1.Put)('update-illustration/:slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.UpdateIllustrationDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "updateIllustrationBySlug", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "getEvenementAdmin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('admin/filter/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.FilterEvenementDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "filterEvenementAdmin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "getEvenementBySlug", null);
__decorate([
    (0, common_1.Put)(':slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dto_1.UpdateEvenementDto]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "updateEvenementBySlug", null);
__decorate([
    (0, common_1.Delete)(':slug/:id'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EvenementController.prototype, "deletePostBySlug", null);
EvenementController = __decorate([
    (0, common_1.Controller)('evenement'),
    __metadata("design:paramtypes", [evenement_service_1.EvenementService])
], EvenementController);
exports.EvenementController = EvenementController;
//# sourceMappingURL=evenement.controller.js.map