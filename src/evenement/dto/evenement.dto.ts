import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEvenementDto {
  @IsNotEmpty()
  @IsNumber()
  idEntreprise: number;

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

  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
}

export class UpdateEvenementDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;

  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
}

export class UpdateIllustrationDto {
  @IsNotEmpty()
  @IsString()
  illustration: string;
}
