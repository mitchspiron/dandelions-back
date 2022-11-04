import { UsersDto, UsersInfoDto, UsersPasswordDto } from './dto';
import { Users, UsersInfo, UsersPassword } from './types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<Users[]>;
    getUsersById(id: number): Promise<Users>;
    createUsers(dto: UsersDto): Promise<Users>;
    updateUsersInfoById(id: number, dto: UsersInfoDto): Promise<UsersInfo>;
    updateUsersPasswordById(id: number, dto: UsersPasswordDto): Promise<UsersPassword>;
    deleteUsersById(id: number): Promise<Users>;
}
