import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs_.service';
import { LogsController } from './logs_.controller';
import { Log } from './entities/logs_.entity';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Log ] ) ],
  controllers: [ LogsController ],
  providers: [ LogsService ],
} )
export class LogsModule {}