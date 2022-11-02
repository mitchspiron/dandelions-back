import { IsNotEmpty, IsString } from 'class-validator';

export class UserRoleDto {
  @IsNotEmpty()
  @IsString()
  nomRole: string;
}
