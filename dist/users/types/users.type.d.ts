export declare type Users = {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
    email: string;
    telephone: string;
    aPropos: string;
    role_utilisateur: {
        id: number;
        nomRole: string;
    };
    motDePasse: string;
};
export declare type UsersCreate = {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
    email: string;
    telephone: string;
    aPropos: string;
    role: number;
    motDePasse: string;
};
export declare type UsersInfo = {
    id: number;
    nom: string;
    prenom: string;
    illustration: string;
    email: string;
    telephone: string;
    aPropos: string;
    role: number;
};
export declare type UsersInfoWithToken = [
    {
        id: number;
        nom: string;
        prenom: string;
        illustration: string;
        email: string;
        telephone: string;
        aPropos: string;
        role: number;
    },
    {
        access_token: string;
    }
];
export declare type UsersPassword = {
    id: number;
    motDePasse: string;
};
export declare type UserTokenWithoutPassword = [
    {
        id: number;
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        aPropos: string;
        role: number;
    },
    {
        access_token: string;
    }
];
