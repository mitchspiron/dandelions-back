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
exports.WriterRequestController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const writer_request_service_1 = require("./writer-request.service");
let WriterRequestController = class WriterRequestController {
    constructor(writerRequest) {
        this.writerRequest = writerRequest;
    }
    async createWriterRequest(dto) {
        return this.writerRequest.createWriterRequest(dto);
    }
    async getWriterRequest() {
        return this.writerRequest.getWriterRequest();
    }
    async acceptWriterRequest(id, user) {
        return this.writerRequest.acceptWriterRequest(id, user);
    }
    async declineWriterRequest(id) {
        return this.writerRequest.declineWriterRequest(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.WriterRequestDto]),
    __metadata("design:returntype", Promise)
], WriterRequestController.prototype, "createWriterRequest", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WriterRequestController.prototype, "getWriterRequest", null);
__decorate([
    (0, common_1.Put)(':id/:user'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('user', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WriterRequestController.prototype, "acceptWriterRequest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterRequestController.prototype, "declineWriterRequest", null);
WriterRequestController = __decorate([
    (0, common_1.Controller)('writer-request'),
    __metadata("design:paramtypes", [writer_request_service_1.WriterRequestService])
], WriterRequestController);
exports.WriterRequestController = WriterRequestController;
//# sourceMappingURL=writer-request.controller.js.map