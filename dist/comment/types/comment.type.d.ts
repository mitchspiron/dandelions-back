export declare type CreateComment = {
    id: number;
    idUtilisateur: number;
    idArticle: number;
    contenu: string;
    createdAt: Date;
};
export declare type GetComment = {
    id: number;
    utilisateur: {
        id: number;
        nom: string;
        prenom: string;
        illustration: string;
    };
    article: {
        id: number;
        titre: string;
        slug: string;
        idRedacteur: number;
        etat: number;
    };
    contenu: string;
    vu: boolean;
    createdAt: Date;
    reponse: {
        id: number;
        utilisateur: {
            id: number;
            nom: string;
            prenom: string;
            illustration: string;
        };
        contenu: string;
        createdAt: Date;
    }[];
};
export declare type CommentToSeen = {
    id: number;
    vu: boolean;
};
