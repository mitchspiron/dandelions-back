import { PrismaService } from '../prisma/prisma.service';
import { EnterpriseDto, EnterpriseUpdateDto, FilterEnterpriseDto, isAbonneeDto, UpdateIllustrationDto } from './dto';
import { Enterprise, isAbonnee } from './types';
export declare class EnterpriseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEnterprise(dto: EnterpriseDto): Promise<Enterprise>;
    getEnterprise(): Promise<Enterprise[]>;
    filterEnterprise(dto: FilterEnterpriseDto): Promise<Enterprise[]>;
    getEnterpriseAdmin(id: number): Promise<Enterprise[]>;
    filterEnterpriseAdmin(id: number, dto: FilterEnterpriseDto): Promise<Enterprise[]>;
    getEnterpriseBySlug(slug: string): Promise<Enterprise>;
    updateEnterpriseBySlug(slug: string, id: number, dto: EnterpriseUpdateDto): Promise<Enterprise>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<Enterprise>;
    isAbonneeBySlug(slug: string, dto: isAbonneeDto): Promise<isAbonnee>;
    deleteEnterpriseBySlug(slug: string, id: number): Promise<Enterprise>;
}
