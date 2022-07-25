import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from 'src/user/schema/user.schema';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async signin(authDto: AuthDto) {
    try {
      const user = await this.userModel.findOne({
        email: authDto.email,
      });

      const pwMatches = await argon.verify(
        user.password,
        authDto.password,
      );

      if (!pwMatches || !user)
        throw new ForbiddenException(
          'Credentials incorrect',
        );

      return this.signToken(user);
    } catch (err) {
      console.log(err);
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

      return this.signToken(user);
    } catch (err) {
      if (err.code === 11000) {
        throw new ForbiddenException(
          'Credentials taken',
        );
      }
      console.log(err);
    }
  }

  async signToken(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
    };
    return this.jwtService
      .signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      })
      .then((access_token: string) => {
        return { access_token };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
