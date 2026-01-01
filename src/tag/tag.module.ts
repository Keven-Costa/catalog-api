import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from './entities/tag.entity';
import { Item } from '../item/entities/item.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Tag , Item ] ) ],
  controllers: [ TagController ],
  providers: [ TagService ],
} )
export class TagModule {}