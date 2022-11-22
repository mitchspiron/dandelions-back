import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  idUtilisateur: number;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}

export class UpdateResponseDto {
  @IsNotEmpty()
  @IsString()
  contenu: string;
}
