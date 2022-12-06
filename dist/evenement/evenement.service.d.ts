import { PrismaService } from '../prisma/prisma.service';
import { CreateEvenementDto, FilterEvenementDto, SwitchOnHeaderDto, SwitchOnSubscribeDto, UpdateEvenementDto, UpdateIllustrationDto } from './dto';
import { CreateEvenement, GetEvenement, SwitchOnHeader, SwitchOnSubscribe } from './types';
export declare class EvenementService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEvenement(dto: CreateEvenementDto): Promise<CreateEvenement>;
    getEvenement(): Promise<GetEvenement[]>;
    getEvenementOnHeader(): Promise<GetEvenement[]>;
    filterEvenement(dto: FilterEvenementDto): Promise<GetEvenement[]>;
    getThreeLastEvenement(): Promise<GetEvenement[]>;
    getEvenementAdmin(id: number): Promise<GetEvenement[]>;
    filterEvenementAdmin(id: number, dto: FilterEvenementDto): Promise<GetEvenement[]>;
    getEvenementBySlug(slug: string): Promise<GetEvenement>;
    updateEvenementBySlug(slug: string, id: number, dto: UpdateEvenementDto): Promise<CreateEvenement>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<CreateEvenement>;
    deleteEvenementBySlug(slug: string, id: number): Promise<CreateEvenement>;
    switchOnHeaderBySlug(slug: string, dto: SwitchOnHeaderDto): Promise<SwitchOnHeader>;
    switchOnSubscribeBySlug(slug: string, dto: SwitchOnSubscribeDto): Promise<SwitchOnSubscribe>;
}
