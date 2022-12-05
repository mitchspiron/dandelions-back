export declare type Response = {
    id: number;
    utilisateur: {
        id: number;
        nom: string;
        prenom: string;
        illustration: string;
    };
    idCommentaire: number;
    contenu: string;
    createdAt: Date;
};
