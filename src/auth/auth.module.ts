import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtUtilsModule } from 'src/jwt-utils/jwt-utils.module';
import { JwtUtilsService } from 'src/jwt-utils/jwt-utils.service';
import {
  User,
  UserSchema,
} from '../user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtUtilsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
