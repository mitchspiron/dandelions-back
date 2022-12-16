/// <reference types="multer" />
import { EnterpriseDto, EnterpriseUpdateDto, FilterEnterpriseDto, isAbonneeDto, UpdateIllustrationDto } from './dto';
import { EnterpriseService } from './enterprise.service';
import { Enterprise, isAbonnee } from './types';
export declare class EnterpriseController {
    private readonly enterpriseService;
    constructor(enterpriseService: EnterpriseService);
    uploadedFile(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
    }>;
    getEnterprise(): Promise<Enterprise[]>;
    filterEnterprise(dto: FilterEnterpriseDto): Promise<Enterprise[]>;
    getEnterpriseAdmin(id: number): Promise<Enterprise[]>;
    filterEnterpriseAdmin(id: number, dto: FilterEnterpriseDto): Promise<Enterprise[]>;
    getEnterpriseBySlug(id: string): Promise<Enterprise>;
    createEnterprise(dto: EnterpriseDto): Promise<Enterprise>;
    isAbonneeBySlug(slug: string, dto: isAbonneeDto): Promise<isAbonnee>;
    updateEnterpriseBySlug(slug: string, id: number, dto: EnterpriseUpdateDto): Promise<Enterprise>;
    updateIllustrationBySlug(slug: string, id: number, dto: UpdateIllustrationDto): Promise<Enterprise>;
    deleteEnterpriseBySlug(slug: string, id: number): Promise<Enterprise>;
}
