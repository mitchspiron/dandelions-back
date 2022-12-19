"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const confirmation_1 = require("./templates/confirmation");
const forgot_1 = require("./templates/forgot");
const event_registration_1 = require("./templates/event-registration");
const accept_writer_request_1 = require("./templates/accept-writer-request");
const decline_writer_request_1 = require("./templates/decline-writer-request");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            secureConnection: false,
            port: 587,
            tls: {
                ciphers: 'SSLv3',
            },
            auth: {
                user: 'mitchspiron@outlook.com',
                pass: 'Leomessi',
            },
        });
    }
    async sendMailConfirmation(to, token) {
        const html = (0, confirmation_1.confirmationTemplate)(token);
        return await this.transporter.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'CONFIRMATION INSCRIPTION - DANDELIONS',
            html,
        });
    }
    async sendMailForgotPassword(to, token) {
        const html = (0, forgot_1.forgotTemplate)(token);
        return await this.transporter.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
            html,
        });
    }
    async sendMailEventRegistration(to, nom, prenom, event, slug) {
        const html = (0, event_registration_1.eventRegistrationTemplate)(nom, prenom, event, slug);
        return await this.transporter.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'INSCRIPTION COMING-SOON - DANDELIONS',
            html,
        });
    }
    async sendMailAcceptWriterRequest(to, nom, prenom) {
        const html = (0, accept_writer_request_1.acceptWriterRequestTemplate)(nom, prenom);
        return await this.transporter.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'DANDELIONS - DEMANDE REDACTION ACCEPTEE',
            html,
        });
    }
    async sendMailDeclineWriterRequest(to, nom, prenom) {
        const html = (0, decline_writer_request_1.declineWriterRequestTemplate)(nom, prenom);
        return await this.transporter.sendMail({
            to: to,
            from: 'mitchspiron@outlook.com',
            subject: 'DANDELIONS - DEMANDE REDACTION REFUSEE',
            html,
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mailer.service.js.map