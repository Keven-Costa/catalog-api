import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Categoria } from './entities/categoria.entity';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Categoria' )
@ApiBearerAuth( 'access-token' )
@Controller( 'categoria' )
export class CategoriaController {
  constructor( private readonly categoriaService: CategoriaService ) {}

  @ApiOperation( { summary: 'Cadastrar categoria' } )
  @Post()
  async create( @Body() createCategoriaDto: CreateCategoriaDto ): Promise< Categoria > {
    return this.categoriaService.create( createCategoriaDto );
  }

  @ApiOperation( { summary: 'Consultar todas as categorias' } )
  @Get()
  async findAll(): Promise< Categoria[] > {
    return this.categoriaService.findAll();
  }

  @ApiOperation( { summary: 'Consultar uma categoria pelo ID' } )
  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ) {
    return this.categoriaService.findOneById( id );
  }

  @ApiOperation( { summary: 'Consultar uma categoria pelo nome' } )
  @Get( '/name/:name' )
  async findByName( @Param( 'name' ) name: string ) {
    return this.categoriaService.findOneByName( name );
  }

  @ApiOperation( { summary: 'Atualizar uma categoria' } )
  @Patch( ':id' )
  async update(
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateCategoriaDto: UpdateCategoriaDto ): Promise< Categoria > {
    return this.categoriaService.update( id, updateCategoriaDto );
  }

  @ApiOperation( { summary: 'Deletar uma categoria' } )
  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.categoriaService.remove( id );
  }
}
