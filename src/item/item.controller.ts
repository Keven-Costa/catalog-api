import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Item' )
@ApiBearerAuth( 'access-token' )
@Controller( 'item' )
export class ItemController {
  constructor( private readonly itemService: ItemService ) {}

  @ApiOperation( { summary: 'Cadastar um item' } )
  @Post()
  async create( @Body() createItemDto: CreateItemDto ): Promise< Item > {
    return this.itemService.create( createItemDto );
  }

  @ApiOperation( { summary: 'Consultar todos os itens' } )
  @Get()
  async findAll(): Promise< Item[] > {
    return this.itemService.findAll();
  }

  @ApiOperation( { summary: 'Consultar um item pelo ID' } )
  @Get( ':id' )
  async findOneById( @Param( 'id', ParseIntPipe ) id: number ): Promise< Item > {
    return this.itemService.findOneById( id );
  }

  @ApiOperation( { summary: 'Consultar um item pelo nome' } )
  @Get( '/nome/:name' )
  async findOneByName( @Param( 'name' ) name: string ): Promise< Item > {
    return this.itemService.findOneByName( name );
  }

  @ApiOperation( { summary: 'Atualizar item' } )
  @Patch( ':id' )
  update( 
    @Param( 'id', ParseIntPipe ) id: number, 
    @Body() updateItemDto: UpdateItemDto ): Promise< Item > {
    return this.itemService.update( id, updateItemDto );
  }

  @ApiOperation( { summary: 'Deletar um item' } )
  @Delete( ':id' )
  @HttpCode( HttpStatus.NO_CONTENT )
  remove( @Param( 'id', ParseIntPipe ) id: number ): Promise< void > {
    return this.itemService.remove( id );
  }
}
