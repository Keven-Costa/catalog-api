import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Localizacao } from './entities/localizacao.entity';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Localização' )
@ApiBearerAuth()
@Controller( 'localizacao' )
export class LocalizacaoController {
  constructor( private readonly localizacaoService: LocalizacaoService ) {}

  @ApiOperation({ summary: 'Cadastrar uma localização' })
  @Post()
  async create( @Body() createLocalizacaoDto: CreateLocalizacaoDto ): Promise< Localizacao > {
    return this.localizacaoService.create( createLocalizacaoDto );
  }

  @ApiOperation({ summary: 'Consultar todas as localização' })
  @Get()
  async findAll(): Promise< Localizacao[] > {
    return this.localizacaoService.findAll();
  }

  @ApiOperation({ summary: 'Consultar uma localização pelo ID' })
  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Localizacao > {
    return this.localizacaoService.findOneById( id );
  }

  @ApiOperation({ summary: 'Consultar uma localização pelo nome' })
  @Get( '/name/:name' )
  async findOneByName( @Param( 'name' ) name: string ): Promise< Localizacao>  {
    return this.localizacaoService.findOneByName( name );
  }

  @ApiOperation({ summary: 'Atualizar uma localização' })
  @Patch( ':id' )
  async update( @Param( 'id' ) id: string, @Body() updateLocalizacaoDto: UpdateLocalizacaoDto ): Promise< Localizacao>  {
    return this.localizacaoService.update( +id, updateLocalizacaoDto );
  }

  @ApiOperation({ summary: 'Deletar uma localização' })
  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void >  {
    return this.localizacaoService.remove( id );
  }
}
