export declare type Token = {
    access_token: string;
};
export declare type User = {
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
export declare type UserToken = [
    {
        id: number;
        nom: string;
        prenom: string;
        illustration: string;
        email: string;
        telephone: string;
        aPropos: string;
        role: number;
        motDePasse: string;
    },
    {
        access_token: string;
    }
];
