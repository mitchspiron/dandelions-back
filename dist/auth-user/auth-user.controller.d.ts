import { AuthUserService } from './auth-user.service';
import { AuthUserDtoSignin, AuthUserDtoSignup, forgotPasswordDto, resetPasswordDto } from './dto';
import { User, UserToken } from './types';
export declare class AuthUserController {
    private authService;
    constructor(authService: AuthUserService);
    signup(dto: AuthUserDtoSignup): Promise<void>;
    confirm(token: any, res: any, req: any): Promise<User>;
    signin(dto: AuthUserDtoSignin): Promise<UserToken>;
    isLoggedIn(req: any, res: any): Promise<any>;
    forgotPassword(dto: forgotPasswordDto): Promise<void>;
    resetPassword(dto: resetPasswordDto, token: any): Promise<User>;
}
