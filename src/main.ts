import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 8080);

  console.log('Application is running on: ' + (await app.getUrl()));
}
bootstrap();
