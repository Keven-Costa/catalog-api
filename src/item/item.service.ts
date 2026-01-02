import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Tag } from '../tag/entities/tag.entity'; 
import { LogsService } from '../logs_/logs_.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository( Item )
    private readonly itemRepository: Repository< Item >,

    @InjectRepository( Tag )
    private readonly tagRepository: Repository< Tag >,
  
    private readonly logService: LogsService
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

    const itemSalvo = await this.itemRepository.save( novoItem );

    const createLogDto = {
      acao: 'Criar',
      descricao_mudanca: "",
      item_id: itemSalvo.id
    }

    this.logService.create( createLogDto )
    
    return itemSalvo
  }

  async findAll(): Promise< Item[] > {
    return this.itemRepository.find( {
      relations: [ 'categoria', 'localizacao', 'tags', 'imagens', 'logs' ],
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

async findOneByName( nome: string ): Promise< Item > {
  const item = await this.itemRepository.findOne( {
    where: { nome: nome },
    relations: [ 'categoria', 'localizacao', 'tags', 'imagens', 'logs' ]
  } );

  if ( !item ) {
    throw new NotFoundException( `Item com o nome "${ nome }" não encontrado` );
  }

  return item;
}


async update ( id: number, updateItemDto: UpdateItemDto ): Promise< Item > {
  const { tag_ids, categoria_id, local_id, ...dadosRestantes } = updateItemDto;
  const itemAntigo = await this.findOneById( id );
  const copiaAntigo = { ...itemAntigo };

  this.itemRepository.merge( itemAntigo, dadosRestantes) ;

  if ( categoria_id ) itemAntigo.categoria = { id: categoria_id } as any;
  if ( local_id ) itemAntigo.localizacao = { id: local_id } as any;
  if ( tag_ids ) {
    itemAntigo.tags = await this.tagRepository.findBy( { id: In( tag_ids ) } );
  }

  const itemAtualizado = await this.itemRepository.save( itemAntigo );
  const itemNovoCompleto = await this.findOneById( id );
  const descricao = await this.logService.createDescription( copiaAntigo, itemNovoCompleto );

  await this.logService.create( {
    acao: 'Atualizar',
    descricao_mudanca: descricao,
    item_id: itemAtualizado.id
  } );

  return itemAtualizado;
}

  async remove( id: number ): Promise< void > {
    const item = await this.findOneById( id );
    
    await this.logService.create( {
      acao: 'Excluir',
      item_id: item.id
    } );

    await this.itemRepository.softRemove( item );
  }
}