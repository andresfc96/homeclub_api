import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CORS } from './constants';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors(CORS);
  app.setGlobalPrefix('api/v1');
  app.use(morgan('dev'));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Homeclub API')
    .setDescription('API para gestión de apartamentos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();