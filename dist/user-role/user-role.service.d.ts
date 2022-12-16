import { PrismaService } from '../prisma/prisma.service';
import { UserRoleDto } from './dto';
import { UserRole } from './types';
export declare class UserRoleService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserRoleById(id: number): Promise<UserRole>;
    getUserRole(): Promise<UserRole[]>;
    createUserRole(dto: UserRoleDto): Promise<UserRole>;
    updateUserRoleById(id: number, dto: UserRoleDto): Promise<UserRole>;
    deleteUserRoleById(id: number): Promise<UserRole>;
}
