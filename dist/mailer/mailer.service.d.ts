import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMailConfirmation(to: any, token: any): Promise<SentMessageInfo>;
}
