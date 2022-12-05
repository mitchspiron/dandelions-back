/// <reference types="multer" />
import { CreateEvenementDto, FilterEvenementDto, SwitchOnHeaderDto, SwitchOnSubscribeDto, UpdateEvenementDto, UpdateIllustrationDto } from './dto';
import { EvenementService } from './evenement.service';
import { CreateEvenement, GetEvenement, SwitchOnHeader, SwitchOnSubscribe } from './types';
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
    getFourLastEvenement(): Promise<GetEvenement[]>;
    switchOnSubscribeBySlug(slug: string, dto: SwitchOnSubscribeDto): Promise<SwitchOnSubscribe>;
    switchOnHeaderBySlug(slug: string, dto: SwitchOnHeaderDto): Promise<SwitchOnHeader>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<CreateEvenement>;
    getEvenementAdmin(id: number): Promise<GetEvenement[]>;
    filterEvenementAdmin(id: number, dto: FilterEvenementDto): Promise<GetEvenement[]>;
    getEvenementBySlug(slug: string): Promise<GetEvenement>;
    updateEvenementBySlug(slug: string, id: number, dto: UpdateEvenementDto): Promise<CreateEvenement>;
    deletePostBySlug(slug: string, id: number): Promise<CreateEvenement>;
}
