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
  idCategorie: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}

export class UpdatePostTitleDto {
  @IsNotEmpty()
  @IsString()
  titre: string;
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
