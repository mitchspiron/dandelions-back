import { PrismaService } from '../prisma/prisma.service';
import { DashboardYearDto } from './dto';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCountUserByYear(dto: DashboardYearDto): Promise<unknown>;
    getAllCountEnterpriseByYear(dto: DashboardYearDto): Promise<unknown>;
    getAllCountPostByYear(dto: DashboardYearDto): Promise<unknown>;
    getAllCountEventByYear(dto: DashboardYearDto): Promise<unknown>;
    getAllCountUsers(): Promise<number>;
    getAllCountEnterprises(): Promise<number>;
    getAllCountPosts(): Promise<number>;
    getAllCountEvents(): Promise<number>;
}
