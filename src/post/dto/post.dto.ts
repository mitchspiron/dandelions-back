import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  idRedacteur: number;

  @IsNotEmpty()
  @IsNumber()
  idCategorie: number;

  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  illustration: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  idCategorie: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}

export class UpdateStateDto {
  @IsNotEmpty()
  etat: number;
}

export class UpdateIllustrationDto {
  @IsNotEmpty()
  @IsString()
  illustration: string;
}

export class SwitchRecommandedDto {
  @IsNotEmpty()
  @IsBoolean()
  recommadee: boolean;
}

export class SwitchTopDto {
  @IsNotEmpty()
  @IsBoolean()
  top: boolean;
}

export class FilterPostsDto {
  @IsString()
  searchkey: string;

  @IsString()
  searchCategory: string;

  @IsString()
  searchEtat: string;
}

export class FilterPostsVisitorDto {
  @IsString()
  searchkey: string;

  @IsString()
  searchCategory: string;
}
