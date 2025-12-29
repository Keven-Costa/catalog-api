import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';


@Controller( 'categoria' )
export class CategoriaController {
  constructor( private readonly categoriaService: CategoriaService ) {}

  @Post()
  async create( @Body() createCategoriaDto: CreateCategoriaDto ): Promise< Categoria > {
    return this.categoriaService.create( createCategoriaDto );
  }

  @Get()
  async findAll(): Promise< Categoria[] > {
    return this.categoriaService.findAll();
  }

  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ) {
    return this.categoriaService.findOneById( id );
  }

  @Get( '/name/:name' )
  async findByName( @Param( 'name' ) name: string ) {
    return this.categoriaService.findOneByName( name );
  }

  @Patch( ':id' )
  async update(
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateCategoriaDto: UpdateCategoriaDto ): Promise< Categoria > {
    return this.categoriaService.update( id, updateCategoriaDto );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.categoriaService.remove( id );
  }
}
