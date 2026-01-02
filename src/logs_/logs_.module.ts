import { Module, forwardRef } from '@nestjs/common'; // Importe forwardRef
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs_.service';
import { LogsController } from './logs_.controller';
import { Log } from './entities/logs_.entity';
import { ItemModule } from '../item/item.module';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Log ] ) ,
  forwardRef( () => ItemModule ) ],
  controllers: [ LogsController ],
  providers: [ LogsService ],
  exports: [ LogsService ], 
} )
export class LogsModule {}