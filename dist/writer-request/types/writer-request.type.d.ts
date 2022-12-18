export declare type WriterRequest = {
    id: number;
    utilisateur: {
        id: number;
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
    };
    acceptee: boolean;
};
export declare type AcceptWriterRequest = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
};
