import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LogsService } from './logs_.service';
import { CreateLogDto } from './dto/create-logs_.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Log } from './entities/logs_.entity';

@UseGuards( JwtAuthGuard )
@Controller( 'logs' ) 
export class LogsController {
  constructor( private readonly logsService: LogsService ) {}

  @Post()
  async create( @Body() createLogDto: CreateLogDto ): Promise < Log > {
    return this.logsService.create( createLogDto );
  }

  @Get()
  async findAll(): Promise < Log[] > {
    return this.logsService.findAll();
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseIntPipe ) id: number ): Promise < Log > {
    return this.logsService.findOneById( id );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise < void > {
    return this.logsService.remove( id );
  }
}