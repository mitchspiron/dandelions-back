import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class isAbonneeDto {
  @IsNotEmpty()
  @IsBoolean()
  abonnee: boolean;
}

export class EnterpriseDto {
  @IsNotEmpty()
  @IsNumber()
  idRedacteur: number;

  @IsNotEmpty()
  @IsString()
  illustration: string;

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  anneeCreation: string;

  @IsNotEmpty()
  @IsString()
  urlWebsite: string;

  @IsNotEmpty()
  @IsString()
  descriptionA: string;

  @IsNotEmpty()
  @IsString()
  descriptionB: string;

  @IsNotEmpty()
  @IsString()
  textContact: string;
}

export class EnterpriseUpdateDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  anneeCreation: string;

  @IsNotEmpty()
  @IsString()
  urlWebsite: string;

  @IsNotEmpty()
  @IsString()
  descriptionA: string;

  @IsNotEmpty()
  @IsString()
  descriptionB: string;

  @IsNotEmpty()
  @IsString()
  textContact: string;
}

export class UpdateIllustrationDto {
  @IsNotEmpty()
  @IsString()
  illustration: string;
}
