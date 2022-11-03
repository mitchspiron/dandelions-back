import { IsNotEmpty, IsString } from 'class-validator';

export class PostCategoryDto {
  @IsNotEmpty()
  @IsString()
  nomCategorie: string;
}
