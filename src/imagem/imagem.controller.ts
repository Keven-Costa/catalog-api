import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ImagemService } from './imagem.service';
import { CreateImagenDto } from './dto/create-imagem.dto';
import { UpdateImagenDto } from './dto/update-imagem.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Imagem } from './entities/imagem.entity';

@UseGuards( JwtAuthGuard )
@Controller( 'imagem' )
export class ImagemController {
  constructor( private readonly imagensService: ImagemService ) {}

  @Post()
  async create( @Body() createImagenDto: CreateImagenDto ): Promise< Imagem > {
    return this.imagensService.create( createImagenDto );
  }

  @Get()
  async findAll(): Promise< Imagem[] > {
    return this.imagensService.findAll();
  }

  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Imagem > {
    return this.imagensService.findOneById( id );
  }

  @Patch( ':id' )
  async update( 
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateImagenDto: UpdateImagenDto ): Promise< Imagem > {
    return this.imagensService.update( id, updateImagenDto );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.imagensService.remove( id );
  }
}
