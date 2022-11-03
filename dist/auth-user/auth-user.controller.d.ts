import { AuthUserService } from './auth-user.service';
import { AuthUserDtoSignin, AuthUserDtoSignup } from './dto';
import { User, UserToken } from './types';
export declare class AuthUserController {
    private authService;
    constructor(authService: AuthUserService);
    signup(dto: AuthUserDtoSignup): Promise<void>;
    confirm(token: any, res: any): Promise<User>;
    signinLocal(dto: AuthUserDtoSignin): Promise<UserToken>;
}
