export declare type CreatePost = {
    idRedacteur: number;
    idCategorie: number;
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    contenu: string;
    top: boolean;
    recommadee: boolean;
    etat: number;
};
export declare type GetPost = {
    id: number;
    utilisateur: {
        id: number;
        nom: string;
        prenom: string;
        role: number;
    };
    categorie_article: {
        id: number;
        nomCategorie: string;
    };
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    contenu: string;
    top: boolean;
    recommadee: boolean;
    vu: boolean;
    etat_article: {
        id: number;
        nomEtat: string;
    };
    createdAt: Date;
};
export declare type GetPostWithoutContent = {
    id: number;
    utilisateur: {
        id: number;
        nom: string;
        prenom: string;
        role: number;
    };
    categorie_article: {
        id: number;
        nomCategorie: string;
    };
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    top: boolean;
    recommadee: boolean;
    vu: boolean;
    etat_article: {
        id: number;
        nomEtat: string;
    };
    createdAt: Date;
};
export declare type UpdatePost = {
    id: number;
    idRedacteur: number;
    idCategorie: number;
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    contenu: string;
    top: boolean;
    recommadee: boolean;
    vu: boolean;
    etat: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare type UpdateStatePost = {
    id: number;
    etat_article: {
        id: number;
        nomEtat: string;
    };
    vu: boolean;
    updatedAt: Date;
};
export declare type SwitchRecommanded = {
    id: number;
    recommadee: boolean;
    updatedAt: Date;
};
export declare type SwitchTop = {
    id: number;
    top: boolean;
    updatedAt: Date;
};
export declare type PostPublishedCategory = {
    id: number;
    categorie_article: [];
};
export declare type PostToSeen = {
    id: number;
    vu: boolean;
    updatedAt: Date;
};
