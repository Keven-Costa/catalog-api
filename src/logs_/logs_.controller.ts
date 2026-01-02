import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LogsService } from './logs_.service';
import { CreateLogDto } from './dto/create-logs_.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Log } from './entities/logs_.entity';
import { LogResponseDto } from './dto/log-response.dto';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Logs' )
@ApiBearerAuth('access-token')
@Controller( 'logs' ) 
export class LogsController {
  constructor( private readonly logsService: LogsService ) {}

  @ApiOperation({ summary: 'Cadastar um log' })
  @Post()
  async create( @Body() createLogDto: CreateLogDto ): Promise < LogResponseDto > {
    return this.logsService.create( createLogDto );
  }

  @ApiOperation({ summary: 'Consultar um log' })
  @Get()
  async findAll(): Promise < LogResponseDto[] > {
    return this.logsService.findAll();
  }

  @ApiOperation({ summary: 'Consultar um log pelo ID' })
  @Get( ':id' )
  async findOne( @Param( 'id', ParseIntPipe ) id: number ): Promise < LogResponseDto > {
    return this.logsService.findOneById( id );
  }

  @ApiOperation({ summary: 'Consultar um log pelo nome do item' })
  @Get( '/by-name-item/:name' )
  async findLogByNameItem( @Param( 'name' ) name: string ): Promise < LogResponseDto[] > {
    return this.logsService.findLogByNameItem( name );
  }

  @ApiOperation({ summary: 'Consultar um log pelo ID do item' })
  @Get( '/by-id-item/:id' )
  async findLogByIdItem( @Param( 'id', ParseIntPipe ) id: number ): Promise < LogResponseDto[] > {
    return this.logsService.findLogByIdItem( id );
  }
}