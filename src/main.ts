import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotAcceptableException, ValidationPipe } from '@nestjs/common';
const express = require('express');
const cors = require('cors');

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'debug', 'verbose'], cors: true,

  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors({
    origin: ["http://localhost:8100", "http://localhost:8101"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('The backend for Fruits and Vegetables app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}

bootstrap();