import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ImagemModule } from './imagem/imagem.module';
import { ItemModule } from './item/item.module';
import { LocalizacaoModule } from './localizacao/localizacao.module';

@Module({
  imports: [
    ConfigModule.forRoot( {
      isGlobal: true, 
    } ),

    TypeOrmModule.forRootAsync( {
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ( {
        type: 'mysql', 
        host: configService.get< string >( 'DB_HOST' ),
        port: configService.get< number >( 'DB_PORT' ),
        username: configService.get< string >( 'DB_USERNAME' ),
        password: configService.get< string >( 'DB_PASSWORD' ),
        database: configService.get< string >( 'DB_DATABASE' ),
        autoLoadEntities: true,
        synchronize: true, 
      } ),
    } ),

    CategoriaModule,
    ImagemModule,
    ItemModule,
    LocalizacaoModule,
  ],
} )
export class AppModule {}