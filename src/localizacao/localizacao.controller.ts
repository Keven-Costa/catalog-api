import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Localizacao } from './entities/localizacao.entity';

@UseGuards( JwtAuthGuard )
@Controller( 'localizacao' )
export class LocalizacaoController {
  constructor( private readonly localizacaoService: LocalizacaoService ) {}

  @Post()
  async create( @Body() createLocalizacaoDto: CreateLocalizacaoDto ): Promise< Localizacao > {
    return this.localizacaoService.create( createLocalizacaoDto );
  }

  @Get()
  async findAll(): Promise< Localizacao[] > {
    return this.localizacaoService.findAll();
  }

  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Localizacao > {
    return this.localizacaoService.findOneById( id );
  }

  @Get( '/name/:name' )
  async findOneByName( @Param( 'name' ) name: string ): Promise< Localizacao>  {
    return this.localizacaoService.findOneByName( name );
  }

  @Patch( ':id' )
  async update( @Param( 'id' ) id: string, @Body() updateLocalizacaoDto: UpdateLocalizacaoDto ): Promise< Localizacao>  {
    return this.localizacaoService.update( +id, updateLocalizacaoDto );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void >  {
    return this.localizacaoService.remove( id );
  }
}
