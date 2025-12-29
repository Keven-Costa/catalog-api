import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  const config = new DocumentBuilder()
    .setTitle( 'CatalogAPI' )
    .setDescription( 'Projeto catalogar' )
    .setContact( "GitHub", "https://github.com/Keven-Costa", "...")
    .setVersion( '1.0' )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen( 4000 );
}

bootstrap();
