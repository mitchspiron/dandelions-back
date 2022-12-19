import { MailService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { WriterRequestDto } from './dto';
import { WriterRequest } from './types';
export declare class WriterRequestService {
    private readonly prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    createWriterRequest(dto: WriterRequestDto): Promise<WriterRequest>;
    getWriterRequest(): Promise<WriterRequest[]>;
    acceptWriterRequest(id: number, user: number): Promise<import(".prisma/client").demande_redacteur | {
        nom: string;
        prenom: string;
        email: string;
        id: number;
    }>;
    declineWriterRequest(id: number): Promise<WriterRequest>;
}
