import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class JwtUtilsService extends JwtService {
  constructor() {
    super();
  }
  async signToken(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
    };
    return this.signAsync(payload, {
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
