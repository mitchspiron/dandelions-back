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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const decorators_2 = require("../common/decorators");
const dto_1 = require("./dto");
const mailer_service_1 = require("./mailer.service");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMailContact(dto) {
        return await this.mailService.sendMailContact(dto);
    }
};
__decorate([
    (0, decorators_2.Public)(),
    (0, decorators_1.Post)('/contact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ContactDto]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendMailContact", null);
MailController = __decorate([
    (0, common_1.Controller)('mailer'),
    __metadata("design:paramtypes", [mailer_service_1.MailService])
], MailController);
exports.MailController = MailController;
//# sourceMappingURL=mailer.controller.js.map