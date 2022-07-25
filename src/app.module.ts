import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtUtilsModule } from './jwt-utils/jwt-utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TodoModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ),
    AuthModule,
    UserModule,
    JwtUtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
