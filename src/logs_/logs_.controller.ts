import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LogsService } from './logs_.service';
import { CreateLogDto } from './dto/create-logs_.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Log } from './entities/logs_.entity';
import { LogResponseDto } from './dto/log-response.dto';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Logs' )
@ApiBearerAuth()
@Controller( 'logs' ) 
export class LogsController {
  constructor( private readonly logsService: LogsService ) {}

  @Post()
  async create( @Body() createLogDto: CreateLogDto ): Promise < LogResponseDto > {
    return this.logsService.create( createLogDto );
  }

  @Get()
  async findAll(): Promise < LogResponseDto[] > {
    return this.logsService.findAll();
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseIntPipe ) id: number ): Promise < LogResponseDto > {
    return this.logsService.findOneById( id );
  }

  @Get( '/by-name-item/:name' )
  async findLogByNameItem( @Param( 'name' ) name: string ): Promise < LogResponseDto[] > {
    return this.logsService.findLogByNameItem( name );
  }

  @Get( '/by-id-item/:id' )
  async findLogByIdItem( @Param( 'id', ParseIntPipe ) id: number ): Promise < LogResponseDto[] > {
    return this.logsService.findLogByIdItem( id );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise < void > {
    return this.logsService.remove( id );
  }
}