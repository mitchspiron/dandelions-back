import { UserRoleService } from './user-role.service';
import { UserRoleDto } from './dto';
import { UserRole } from './types';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    getUserRole(): Promise<UserRole[]>;
    getUserRoleById(id: number): Promise<UserRole>;
    createUserRole(dto: UserRoleDto): Promise<UserRole>;
    updateUserRoleById(id: number, dto: UserRoleDto): Promise<UserRole>;
    deleteUserRoleById(id: number): Promise<UserRole>;
}
