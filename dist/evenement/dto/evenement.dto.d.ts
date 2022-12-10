export declare class CreateEvenementDto {
    idEntreprise: number;
    titre: string;
    illustration: string;
    description: string;
    contenu: string;
    deadline: Date;
    onSubscribe: boolean;
}
export declare class UpdateEvenementDto {
    titre: string;
    description: string;
    contenu: string;
    deadline: Date;
    onSubscribe: boolean;
}
export declare class UpdateIllustrationDto {
    illustration: string;
}
export declare class FilterEvenementDto {
    searchkey: string;
}
export declare class SwitchOnHeaderDto {
    onHeader: boolean;
}
export declare class SwitchOnSubscribeDto {
    onSubscribe: boolean;
}
export declare class SwitchIsArchivedDto {
    isArchived: boolean;
}
