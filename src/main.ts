import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: ['attachments/public/:key', 'attachments/private/:key'],
  });

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  config.update({
    accessKeyId: configService.get('s3.accessKeyId'),
    secretAccessKey: configService.get('s3.secretAccessKey'),
    region: configService.get('s3.region'),
    signatureVersion: 'v4',
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
