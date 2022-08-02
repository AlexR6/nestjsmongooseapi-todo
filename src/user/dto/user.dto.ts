import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  pseudo: string;

  @IsNotEmpty()
  password: string;
}
