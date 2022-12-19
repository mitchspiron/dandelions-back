import { WriterRequestDto } from './dto';
import { WriterRequest } from './types';
import { WriterRequestService } from './writer-request.service';
export declare class WriterRequestController {
    private readonly writerRequest;
    constructor(writerRequest: WriterRequestService);
    createWriterRequest(dto: WriterRequestDto): Promise<WriterRequest>;
    getWriterRequest(): Promise<WriterRequest[]>;
    acceptWriterRequest(id: number, user: number): Promise<import(".prisma/client").demande_redacteur | {
        id: number;
        nom: string;
        prenom: string;
        email: string;
    }>;
    declineWriterRequest(id: number): Promise<WriterRequest>;
}
