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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const decorators_1 = require("../common/decorators");
const file_upload_utils_1 = require("../utils/file-upload.utils");
const dto_1 = require("./dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async getUsers() {
        return await this.usersService.getUsers();
    }
    async filterUsers(dto) {
        return await this.usersService.filterUsers(dto);
    }
    async getUsersById(id) {
        return await this.usersService.getUsersById(id);
    }
    async createUsers(dto) {
        return await this.usersService.createUsers(dto);
    }
    async updateUsersInfoById(id, dto) {
        return await this.usersService.updateUsersInfoById(id, dto);
    }
    async updateIllustrationById(id, dto) {
        return await this.usersService.updateIllustrationById(id, dto);
    }
    async updateUsersPasswordById(id, dto) {
        return await this.usersService.updateUsersPasswordById(id, dto);
    }
    async deleteUsersById(id) {
        return await this.usersService.deleteUsersById(id);
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
], UsersController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterUserseDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "filterUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Put)('/info/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UsersInfoDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUsersInfoById", null);
__decorate([
    (0, common_1.Put)('update-illustration/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateIllustrationDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateIllustrationById", null);
__decorate([
    (0, common_1.Put)('/password/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UsersPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUsersPasswordById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUsersById", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map