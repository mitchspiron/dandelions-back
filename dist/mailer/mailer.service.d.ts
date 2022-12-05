import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMailConfirmation(to: any, token: any): Promise<SentMessageInfo>;
    sendMailForgotPassword(to: any, token: any): Promise<SentMessageInfo>;
    sendMailEventRegistration(to: any, nom: any, prenom: any, event: any): Promise<SentMessageInfo>;
}
