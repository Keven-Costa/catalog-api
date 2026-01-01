import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { Tag } from '../tag/entities/tag.entity';
import { LogsModule } from '../logs_/logs_.module';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Item, Tag ] ), LogsModule ],
  controllers: [ ItemController ],
  providers: [ ItemService ],
} )
export class ItemModule {}