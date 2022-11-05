import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
