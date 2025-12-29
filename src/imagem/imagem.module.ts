import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagemService } from './imagem.service';
import { ImagemController } from './imagem.controller';
import { Imagem } from './entities/imagem.entity'; 

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Imagem ] ) ],
  controllers: [ ImagemController ],
  providers: [ ImagemService ],
} )
export class ImagemModule {}