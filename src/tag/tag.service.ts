import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository( Tag )
    private readonly repository: Repository< Tag >,
  ) {}

  async create( createTagDto: CreateTagDto ): Promise< Tag > {
    const novaTag = this.repository.create( createTagDto );
    return this.repository.save( novaTag );
  }

  async findAll(): Promise< Tag[] > {
    return this.repository.find( {
      relations: [ 'itens' ],
    } );
  }

  async findOneById( id: number ): Promise< Tag > {
    const tag = await this.repository.findOne( {
      where: { id },
      relations: [ 'itens' ],
    } );

    if ( !tag ) {
      throw new NotFoundException( `Tag com ID ${ id } não encontrada` );
    }

    return tag;
  }
  async findOneByName( name: string ): Promise< Tag > {
    const tag = await this.repository.findOne({
      where: { nome: name },
    });

    if ( !tag ) {
      throw new NotFoundException(`Tag '${ name }' não encontrada`);
    }

    return tag;
  }

  async update( id: number, updateTagDto: UpdateTagDto ): Promise< Tag > {
    const tag = await this.repository.preload( {
      id: id,
      ...updateTagDto,
    } );

    if ( !tag ) {
      throw new NotFoundException( `Tag com ID ${ id } não encontrada para atualizar` );
    }

    return this.repository.save( tag );
  }

  async remove( id: number ): Promise< void > {
    const tag = await this.findOneById( id );
    await this.repository.remove( tag );
  }
}