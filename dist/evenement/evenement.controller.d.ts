/// <reference types="multer" />
import { CreateEvenementDto, FilterEvenementDto, SwitchIsArchivedDto, SwitchOnHeaderDto, SwitchOnSubscribeDto, UpdateEvenementDto, UpdateIllustrationDto } from './dto';
import { EvenementService } from './evenement.service';
import { CreateEvenement, GetEvenement, SwitchIsArchived, SwitchOnHeader, SwitchOnSubscribe } from './types';
export declare class EvenementController {
    private readonly evenementService;
    constructor(evenementService: EvenementService);
    uploadedFile(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
    }>;
    createEvenement(dto: CreateEvenementDto): Promise<CreateEvenement>;
    getEvenement(): Promise<GetEvenement[]>;
    getEvenementOnHeader(): Promise<GetEvenement[]>;
    filterEvenement(dto: FilterEvenementDto): Promise<GetEvenement[]>;
    getThreeLastEvenement(): Promise<GetEvenement[]>;
    switchOnSubscribeBySlug(slug: string, dto: SwitchOnSubscribeDto): Promise<SwitchOnSubscribe>;
    switchOnHeaderBySlug(slug: string, dto: SwitchOnHeaderDto): Promise<SwitchOnHeader>;
    switchIsArchivedBySlug(slug: string, dto: SwitchIsArchivedDto): Promise<SwitchIsArchived>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<CreateEvenement>;
    updateArchivedById(): Promise<void>;
    getEvenementAdmin(id: number): Promise<GetEvenement[]>;
    getEvenementArchivedAdmin(id: number): Promise<GetEvenement[]>;
    filterEvenementAdmin(id: number, dto: FilterEvenementDto): Promise<GetEvenement[]>;
    filterEvenementArchivedAdmin(id: number, dto: FilterEvenementDto): Promise<GetEvenement[]>;
    getEvenementBySlug(slug: string): Promise<GetEvenement>;
    updateEvenementBySlug(slug: string, id: number, dto: UpdateEvenementDto): Promise<CreateEvenement>;
    deleteEvenementBySlug(slug: string, id: number): Promise<CreateEvenement>;
}
