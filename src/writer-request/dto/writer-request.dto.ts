import { IsBoolean, IsNotEmpty } from 'class-validator';

export class WriterRequestDto {
  @IsNotEmpty()
  idUtilisateur: number;
}

export class AcceptedWriterRequestDto {
  @IsNotEmpty()
  idUtilisateur: number;

  @IsNotEmpty()
  @IsBoolean()
  acceptee: boolean;
}
