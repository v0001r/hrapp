import { NestFactory, Reflector } from '@nestjs/core';
import { UnprocessableEntityException, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
import { config as AWSConfig }  from 'aws-sdk';

import { AppModule } from './app.module';

process.env.TZ = "Asia/Kolkata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  });
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  AWSConfig.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  const port = configService.get<number>('PORT');
  await app.listen(port ?? '5012');
  console.log(`Application listening in port: ${port}`);
}
bootstrap();
