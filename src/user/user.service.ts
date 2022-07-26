import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtUtilsService } from 'src/jwt-utils/jwt-utils.service';
import { UserDto } from './dto/user.dto';
import {
  User,
  UserDocument,
} from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtUtilsService: JwtUtilsService,
  ) {}
  async updateUser(
    userDto: UserDto,
    userId: string,
  ) {
    const user =
      await this.userModel.findByIdAndUpdate(
        userId,
        userDto,
        { new: true },
      );
    return this.jwtUtilsService.signToken(user);
  }
}
