import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { JwtUtilsService } from 'src/jwt-utils/jwt-utils.service';
import {
  User,
  UserDocument,
} from 'src/user/schema/user.schema';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtUtilsService: JwtUtilsService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async signin(authDto: AuthDto) {
    try {
      const user = await this.userModel.findOne({
        email: authDto.email,
      });

      if (!user)
        throw new ForbiddenException(
          'Identifiants incorrects',
        );

      const pwMatches = await argon.verify(
        user.password,
        authDto.password,
      );

      if (!pwMatches)
        throw new ForbiddenException(
          'Identifiants incorrects',
        );

      return this.jwtUtilsService.signToken(user);
    } catch (err) {
      throw err;
    }
  }

  async signup(authDto: AuthDto) {
    try {
      const password = await argon.hash(
        authDto.password,
      );
      const user = await this.userModel.create({
        ...authDto,
        password,
      });

      return this.jwtUtilsService.signToken(user);
    } catch (err) {
      if (err.code === 11000) {
        throw new ForbiddenException(
          'Credentials taken',
        );
      }
      throw err;
    }
  }
}
