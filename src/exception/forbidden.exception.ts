import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(messageError: string) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: messageError,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
