import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BookLand API')
    .setDescription('The BookLand API description')
    .setVersion('1.0')
    .addTag('bookland')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (process.env.SEED === 'true') {
    const seederService = app.get(SeederService);
    await seederService.seed();
  }
  console.log(`${process.env.JWT_EXPIRE}`);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT || 8080, '0.0.0.0');

  console.log('Application is running on: ' + (await app.getUrl()));
}
bootstrap();
