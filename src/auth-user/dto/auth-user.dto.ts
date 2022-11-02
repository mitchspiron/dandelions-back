import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDtoSignup {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsString()
  illustration: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;
}

export class AuthUserDtoSignin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  motDePasse: string;
}
