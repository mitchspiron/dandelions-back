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
const confirmation_1 = require("./templates/confirmation");
const forgot_1 = require("./templates/forgot");
const event_registration_1 = require("./templates/event-registration");
const accept_writer_request_1 = require("./templates/accept-writer-request");
const decline_writer_request_1 = require("./templates/decline-writer-request");
const contact_1 = require("./templates/contact");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMailConfirmation(to, token) {
        const html = (0, confirmation_1.confirmationTemplate)(token);
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'CONFIRMATION INSCRIPTION - DANDELIONS',
            html,
        });
    }
    async sendMailForgotPassword(to, token) {
        const html = (0, forgot_1.forgotTemplate)(token);
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
            html,
        });
    }
    async sendMailEventRegistration(to, nom, prenom, event, slug) {
        const html = (0, event_registration_1.eventRegistrationTemplate)(nom, prenom, event, slug);
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'INSCRIPTION COMING-SOON - DANDELIONS',
            html,
        });
    }
    async sendMailAcceptWriterRequest(to, nom, prenom) {
        const html = (0, accept_writer_request_1.acceptWriterRequestTemplate)(nom, prenom);
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'DANDELIONS - DEMANDE REDACTION ACCEPTEE',
            html,
        });
    }
    async sendMailDeclineWriterRequest(to, nom, prenom) {
        const html = (0, decline_writer_request_1.declineWriterRequestTemplate)(nom, prenom);
        return await this.mailerService.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'DANDELIONS - DEMANDE REDACTION REFUSEE',
            html,
        });
    }
    async sendMailContact(dto) {
        const html = (0, contact_1.contactTemplate)(dto);
        return await this.mailerService
            .sendMail({
            to: 'mitchspiron@outlook.com',
            from: dto.from,
            subject: 'DANDELIONS - NOUVEAU CONTACT',
            html,
        })
            .then(() => console.log('Vérifier votre boîte email!'))
            .catch(() => {
            throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mailer.service.js.map