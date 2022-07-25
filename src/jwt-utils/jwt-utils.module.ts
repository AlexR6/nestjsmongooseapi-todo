import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/user/schema/user.schema';
import { JwtUtilsService } from './jwt-utils.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [JwtUtilsService, JwtStrategy],
  exports: [JwtUtilsService],
})
export class JwtUtilsModule {}
