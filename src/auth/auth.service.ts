import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async signin(userDto: UserDto) {
    try {
      const user = await this.userModel.findOne({ email: userDto.email });

      const pwMatches = await argon.verify(user.password, userDto.password);

      if (!pwMatches || !user)
        throw new ForbiddenException('Credentials incorrect');

      return this.signToken(user.id, user.email);
    } catch (err) {
      console.log(err);
    }
  }

  async signup(userDto: UserDto) {
    try {
      const password = await argon.hash(userDto.password);
      const user = await this.userModel.create({ ...userDto, password });

      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err.code === 11000) {
        throw new ForbiddenException('Credentials taken');
      }
      console.log(err);
    }
  }

  async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwtService
      .signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      })
      .then((access_token) => {
        return { access_token };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
