import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtUtilsModule } from 'src/jwt-utils/jwt-utils.module';
import {
  User,
  UserSchema,
} from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtUtilsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
