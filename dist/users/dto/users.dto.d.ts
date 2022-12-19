export declare class UsersDto {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    aPropos: string;
    role: number;
    motDePasse: string;
}
export declare class UsersInfoDto {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    aPropos: string;
    role: number;
}
export declare class UsersPasswordDto {
    ancienMotDePasse: string;
    nouveauMotDePasse: string;
}
export declare class UpdateIllustrationDto {
    illustration: string;
}
export declare class FilterUserseDto {
    searchkey: string;
    searchRole: string;
}
