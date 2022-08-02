import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  pseudo: string;

  @IsNotEmpty()
  password: string;
}
