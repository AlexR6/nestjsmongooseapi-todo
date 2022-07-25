import {
  IsString,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';

export class TodoDto {
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      if (!args.value)
        return 'Le nom doit être renseigner';
      else if (
        args.value &&
        args.value.length <= 2
      )
        return 'Le nom est trop court';
    },
  })
  @MaxLength(50, {
    message: (args: ValidationArguments) => {
      if (args.value && args.value.length > 50)
        return 'Le nom est trop long';
    },
  })
  @IsString({
    message:
      'Le nom doit être une chaines de caractères',
  })
  name: string;

  @MaxLength(200, {
    message: (args: ValidationArguments) => {
      if (args.value && args.value.length > 50)
        return 'La description est trop longue';
    },
  })
  @IsString()
  description: string;
}
