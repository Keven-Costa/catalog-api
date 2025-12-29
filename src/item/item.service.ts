import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Tag } from '../tag/entities/tag.entity'; 

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository( Item )
    private readonly itemRepository: Repository< Item >,

    @InjectRepository( Tag )
    private readonly tagRepository: Repository< Tag >,
  ) {}

  async create( createItemDto: CreateItemDto ): Promise< Item > {
    const { tag_ids, categoria_id, local_id, ...dadosItem } = createItemDto;
    const novoItem = this.itemRepository.create( {
      ...dadosItem,
      categoria: { id: categoria_id }, 
      localizacao: { id: local_id },   
    } );

    if ( tag_ids && tag_ids.length > 0 ) {
      novoItem.tags = await this.tagRepository.findBy( {
        id: In( tag_ids ),
      } );
    }

    return this.itemRepository.save( novoItem );
  }

  async findAll(): Promise< Item[] > {
    return this.itemRepository.find( {
      relations: [ 'categoria', 'localizacao', 'tags', 'imagens' ],
    } );
  }

  async findOneById( id: number ): Promise< Item > {
    const item = await this.itemRepository.findOne( {
      where: { id },
      relations: [ 'categoria', 'localizacao', 'tags', 'imagens', 'logs' ],
    } );

    if ( !item ) {
      throw new NotFoundException( `Item com ID ${ id } não encontrado` );
    }

    return item;
  }

  async update( id: number, updateItemDto: UpdateItemDto ): Promise< Item > {
    const { tag_ids, categoria_id, local_id, ...dadosRestantes } = updateItemDto;
    const item = await this.findOneById( id );
    this.itemRepository.merge( item, dadosRestantes );

    if ( categoria_id ) item.categoria = { id: categoria_id } as any;
    if ( local_id ) item.localizacao = { id: local_id } as any;
    if ( tag_ids ) {
      item.tags = await this.tagRepository.findBy( { id: In( tag_ids ) } );
    }

    return this.itemRepository.save( item );
  }

  async remove( id: number ): Promise< void > {
    const item = await this.findOneById( id );
    await this.itemRepository.remove( item );
  }
}