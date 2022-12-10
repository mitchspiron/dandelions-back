import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  deadline: Date;

  @IsBoolean()
  @IsNotEmpty()
  onSubscribe: boolean;
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
  deadline: Date;

  @IsBoolean()
  @IsNotEmpty()
  onSubscribe: boolean;
}

export class UpdateIllustrationDto {
  @IsNotEmpty()
  @IsString()
  illustration: string;
}

export class FilterEvenementDto {
  @IsString()
  searchkey: string;
}

export class SwitchOnHeaderDto {
  @IsNotEmpty()
  @IsBoolean()
  onHeader: boolean;
}

export class SwitchOnSubscribeDto {
  @IsNotEmpty()
  @IsBoolean()
  onSubscribe: boolean;
}

export class SwitchIsArchivedDto {
  @IsNotEmpty()
  @IsBoolean()
  isArchived: boolean;
}
