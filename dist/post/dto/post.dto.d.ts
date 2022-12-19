export declare class CreatePostDto {
    idRedacteur: number;
    idCategorie: number;
    titre: string;
    illustration: string;
    description: string;
    contenu: string;
}
export declare class UpdatePostDto {
    titre: string;
    idCategorie: number;
    description: string;
    contenu: string;
}
export declare class UpdateStateDto {
    etat: number;
}
export declare class UpdateIllustrationDto {
    illustration: string;
}
export declare class SwitchRecommandedDto {
    recommadee: boolean;
}
export declare class SwitchTopDto {
    top: boolean;
}
export declare class FilterPostsDto {
    searchkey: string;
    searchCategory: string;
    searchEtat: string;
}
export declare class FilterPostsVisitorDto {
    searchkey: string;
    searchCategory: string;
}
export declare class FilterCategoryByPostDto {
    searchkey: string;
}
