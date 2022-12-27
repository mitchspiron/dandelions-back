import { MailerService } from '@nestjs-modules/mailer';
import { ContactDto } from './dto';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMailConfirmation(to: any, token: any): Promise<SentMessageInfo>;
    sendMailForgotPassword(to: any, token: any): Promise<SentMessageInfo>;
    sendMailEventRegistration(to: any, nom: any, prenom: any, event: any, slug: any): Promise<SentMessageInfo>;
    sendMailAcceptWriterRequest(to: any, nom: any, prenom: any): Promise<SentMessageInfo>;
    sendMailDeclineWriterRequest(to: any, nom: any, prenom: any): Promise<SentMessageInfo>;
    sendMailContact(dto: ContactDto): Promise<SentMessageInfo>;
}
