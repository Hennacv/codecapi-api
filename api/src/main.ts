import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import dataSource from './db/data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { json, urlencoded } from 'express';

async function bootstrap() {
  await dataSource.initialize();
  initializeApp({
    credential: applicationDefault(),
  });
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();

  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('[codecapi] Portal')
    .setDescription('The legendary [codecapi] portal')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
