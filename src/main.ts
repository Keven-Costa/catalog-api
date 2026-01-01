import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  const config = new DocumentBuilder()
      .setTitle('CatalogAPI')
      .setDescription(
        'API RESTful robusta para catalogação de bens e ativos. ' +
        'Permite o controle completo de itens, categorias, localizações e histórico de auditoria.',
      )
      .setContact(
        'Keven Costa', 
        'https://github.com/Keven-Costa', 
        'ogkeven278@gmail.com'
      )
      .setVersion('1.0.0')
      .addTag('Item', 'Operações de gerenciamento de itens do catálogo')
      .addTag('Categoria', 'Classificações dos itens')
      .addTag('Localização', 'Gestão dos locais físicos onde os itens estão armazenados')
      .addTag('Imagem', 'Gerenciamento de galeria de fotos ')
      .addTag('Usuários', 'Controle de perfis, permissões e dados dos usuários do sistema')
      .addTag('Logs', 'Histórico de auditoria e movimentações')
      .addTag('Auth', 'Autenticação e controle de acesso')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Insira o token JWT gerado no login',
          in: 'header',
        },
        'access-token', 
      )
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen( 4000 );
}

bootstrap();
