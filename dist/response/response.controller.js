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
exports.ResponseController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const dto_1 = require("./dto");
const response_service_1 = require("./response.service");
let ResponseController = class ResponseController {
    constructor(responseService) {
        this.responseService = responseService;
    }
    async createResponse(id, dto) {
        return await this.responseService.createResponse(id, dto);
    }
    async getResponseByComment(id) {
        return await this.responseService.getResponseByComment(id);
    }
    async getResponseById(id) {
        return await this.responseService.getResponseById(id);
    }
    async getUnseenResponse(id) {
        return await this.responseService.getUnseenResponse(id);
    }
    async updateResponseById(id, dto) {
        return await this.responseService.updateResponseById(id, dto);
    }
    async updateResponseToSeen(id) {
        return await this.responseService.updateResponseToSeen(id);
    }
    async deleteResponseById(id) {
        return await this.responseService.deleteResponseById(id);
    }
};
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CreateResponseDto]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "createResponse", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('comment/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "getResponseByComment", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "getResponseById", null);
__decorate([
    (0, common_1.Get)('/unseen/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "getUnseenResponse", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateResponseDto]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "updateResponseById", null);
__decorate([
    (0, common_1.Put)('/to-seen/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "updateResponseToSeen", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResponseController.prototype, "deleteResponseById", null);
ResponseController = __decorate([
    (0, common_1.Controller)('response'),
    __metadata("design:paramtypes", [response_service_1.ResponseService])
], ResponseController);
exports.ResponseController = ResponseController;
//# sourceMappingURL=response.controller.js.map