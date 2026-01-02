import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Localizacao } from '../localizacao/entities/localizacao.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Item } from '../item/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ Categoria, Localizacao, Tag, Item ] ),
  ],
  providers: [ SeedService ],
})
export class SeedModule {}