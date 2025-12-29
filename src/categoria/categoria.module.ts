import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './entities/categoria.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Categoria ] ) ],
  controllers: [ CategoriaController ],
  providers: [ CategoriaService ],
  exports: [ TypeOrmModule ],
})
export class CategoriaModule {}