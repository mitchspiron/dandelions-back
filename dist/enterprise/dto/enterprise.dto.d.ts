export declare class isAbonneeDto {
    abonnee: boolean;
}
export declare class EnterpriseDto {
    idRedacteur: number;
    illustration: string;
    nom: string;
    brand: string;
    email: string;
    telephone: string;
    anneeCreation: string;
    urlWebsite: string;
    descriptionA: string;
    descriptionB: string;
    textContact: string;
}
export declare class EnterpriseUpdateDto {
    nom: string;
    brand: string;
    email: string;
    telephone: string;
    anneeCreation: string;
    urlWebsite: string;
    descriptionA: string;
    descriptionB: string;
    textContact: string;
}
export declare class UpdateIllustrationDto {
    illustration: string;
}
export declare class FilterEnterpriseDto {
    searchkey: string;
}
