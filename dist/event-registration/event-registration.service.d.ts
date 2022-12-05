import { MailService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventRegistrationDto, FilterEventRegistrationDto } from './dto';
import { EventRegistration } from './types';
export declare class EventRegistrationService {
    private readonly prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    createEventRegistration(dto: EventRegistrationDto): Promise<EventRegistration>;
    getEventRegistrationByEvent(slug: string): Promise<EventRegistration[]>;
    filterEventRegistrationByEvent(slug: string, dto: FilterEventRegistrationDto): Promise<EventRegistration[]>;
}
