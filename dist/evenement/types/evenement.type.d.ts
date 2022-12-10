export declare type CreateEvenement = {
    id: number;
    idEntreprise: number;
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    contenu: string;
    deadline: Date;
    onHeader: boolean;
    createdAt: Date;
    onSubscribe: boolean;
};
export declare type GetEvenement = {
    id: number;
    entreprise: {
        id: number;
        nom: string;
        illustration: string;
        slug: string;
        descriptionA: string;
    };
    titre: string;
    slug: string;
    illustration: string;
    description: string;
    contenu: string;
    deadline: Date;
    onHeader: boolean;
    createdAt: Date;
    onSubscribe: boolean;
    isArchived: boolean;
    inscription_evenement: {
        id: number;
        idUtilisateur: number;
    }[];
};
export declare type GetEvenementOnDeadline = {
    id: number;
    titre: string;
    slug: string;
    deadline: Date;
    isArchived: boolean;
};
export declare type SwitchOnHeader = {
    id: number;
    onHeader: boolean;
};
export declare type SwitchOnSubscribe = {
    id: number;
    onSubscribe: boolean;
};
export declare type SwitchIsArchived = {
    id: number;
    isArchived: boolean;
};
