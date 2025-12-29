import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Controller( 'tag' )
export class TagController {
  constructor( private readonly tagService: TagService ) {}

  @Post()
  async create( @Body() createTagDto: CreateTagDto ): Promise< Tag > {
    return this.tagService.create( createTagDto );
  }

  @Get()
  async findAll(): Promise< Tag[] > {
    return this.tagService.findAll();
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseIntPipe ) id: number ): Promise< Tag > {
    return this.tagService.findOneById( id );
  }

  @Get( '/name/:name' )
  async findByName( @Param( 'name' ) name: string ): Promise< Tag > {
    return this.tagService.findOneByName( name );
  }

  @Patch( ':id' )
  async update(
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateTagDto: UpdateTagDto ): Promise< Tag > {
    return this.tagService.update( id, updateTagDto );
  }

  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  async remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.tagService.remove( id );
  }
}