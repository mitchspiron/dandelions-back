import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  aPropos: string;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;
}

export class UsersInfoDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  aPropos: string;

  @IsNotEmpty()
  role: number;
}

export class UsersPasswordDto {
  @IsNotEmpty()
  @IsString()
  ancienMotDePasse: string;

  @IsNotEmpty()
  @IsString()
  nouveauMotDePasse: string;
}

export class UpdateIllustrationDto {
  @IsNotEmpty()
  @IsString()
  illustration: string;
}

export class FilterUserseDto {
  @IsString()
  searchkey: string;

  @IsString()
  searchRole: string;
}
