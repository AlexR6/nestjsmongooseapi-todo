import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../jwt-utils/guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user/me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateUser(
    userDto: UserDto,
    @GetUser('id') userId: string,
  ) {
    return this.userService.updateUser(
      userDto,
      userId,
    );
  }

  @Delete('delete')
  deleteUser() {
    console.log('dedans');
    return;
  }
}
