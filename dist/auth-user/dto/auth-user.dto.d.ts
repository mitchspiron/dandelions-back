export declare class AuthUserDtoSignup {
    nom: string;
    prenom: string;
    illustration: string;
    email: string;
    telephone: string;
    role: number;
    motDePasse: string;
}
export declare class AuthUserDtoSignin {
    email: string;
    motDePasse: string;
}
export declare class forgotPasswordDto {
    email: string;
}
export declare class resetPasswordDto {
    motDePasse: string;
}
