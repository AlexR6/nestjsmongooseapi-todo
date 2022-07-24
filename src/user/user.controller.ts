import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user/me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return 'ok';
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateUser() {
    return;
  }

  @Delete('delete')
  deleteUser() {
    return;
  }
}
