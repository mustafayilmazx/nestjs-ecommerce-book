import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SEED === 'true') {
    const seederService = app.get(SeederService);
    await seederService.seed();
  }
  console.log(`${process.env.JWT_EXPIRE}`);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8080, '0.0.0.0');

  console.log('Application is running on: ' + (await app.getUrl()));
}
bootstrap();
