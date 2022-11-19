import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  idUtilisateur: number;

  @IsNotEmpty()
  idArticle: number;

  @IsNotEmpty()
  @IsString()
  contenu: string;
}

export class UpdateCommentdto {
  @IsNotEmpty()
  @IsString()
  contenu: string;
}
