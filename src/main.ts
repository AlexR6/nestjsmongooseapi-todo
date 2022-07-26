import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3000'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
