import { IsNotEmpty } from 'class-validator';

export class EventRegistrationDto {
  @IsNotEmpty()
  idEvenement: number;

  @IsNotEmpty()
  idUtilisateur: number;
}
