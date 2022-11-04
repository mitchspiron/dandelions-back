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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMailConfirmation(to, token) {
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'CONFIRMATION INSCRIPTION - DANDELIONS',
            html: `<p><a href="http://localhost:3000/auth-user/signup/confirm/${token}">CONFIRMER</a></p>`,
        });
    }
    async sendMailForgotPassword(to, token) {
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
            html: `<p><a href="http://localhost:8080/recuperer-mot-de-passe/${token}">RECUPERER</a></p>`,
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mailer.service.js.map