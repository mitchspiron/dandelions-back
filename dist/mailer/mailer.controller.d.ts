import { ContactDto } from './dto';
import { MailService } from './mailer.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendMailContact(dto: ContactDto): Promise<void>;
}
