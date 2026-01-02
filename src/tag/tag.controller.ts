import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Tag' )
@ApiBearerAuth('access-token')
@Controller( 'tag' )
export class TagController {
  constructor( private readonly tagService: TagService ) {}

  @ApiOperation({ summary: 'Cadastar um tag' })
  @Post()
  async create( @Body() createTagDto: CreateTagDto ): Promise< Tag > {
    return this.tagService.create( createTagDto );
  }

  @ApiOperation({ summary: 'Consultar todas as tags' })
  @Get()
  async findAll(): Promise< Tag[] > {
    return this.tagService.findAll();
  }

  @ApiOperation({ summary: 'Consultar uma tag pelo ID' })
  @Get( ':id' )
  async findOne( @Param( 'id', ParseIntPipe ) id: number ): Promise< Tag > {
    return this.tagService.findOneById( id );
  }

  @ApiOperation({ summary: 'Consultar uma tag pelo nome' })
  @Get( '/name/:name' )
  async findByName( @Param( 'name' ) name: string ): Promise< Tag > {
    return this.tagService.findOneByName( name );
  }

  @ApiOperation({ summary: 'Atulizar uma tag' })
  @Patch( ':id' )
  async update(
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateTagDto: UpdateTagDto ): Promise< Tag > {
    return this.tagService.update( id, updateTagDto );
  }

  @ApiOperation({ summary: 'Deletar uma tag' })
  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.tagService.remove( id );
  }
}