import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto';
import { Localizacao } from './entities/localizacao.entity';

@Injectable()
export class LocalizacaoService {
  constructor(
    @InjectRepository( Localizacao )
    private readonly repository: Repository< Localizacao >,
  ) {}

  async create( createLocalizacaoDto: CreateLocalizacaoDto ): Promise< Localizacao > { 
    const novaLocalizacao = this.repository.create( createLocalizacaoDto );
    return this.repository.save( novaLocalizacao );
  }

  async findAll(): Promise< Localizacao[] > {
    return this.repository.find( { relations: [ 'itens' ] } );
  }

  async findOneById( id: number ): Promise< Localizacao > {
    const localizacao = await this.repository.findOne( {
      where: { id },
      relations: [ 'itens' ],
    } );

    if ( !localizacao ) {
      throw new NotFoundException( `Localização com ID ${ id } não encontrada` );
    }

    return localizacao;
  }

  async findOneByName( name: string ): Promise< Localizacao > {
    const localizacao = await this.repository.findOne( {
      where: { nome: name },
    } );

    if ( !localizacao ) {
      throw new NotFoundException( `Localização '${ name }' não encontrada` );
    }

    return localizacao;
  }

  async update( id: number, updateLocalizacaoDto: UpdateLocalizacaoDto ): Promise< Localizacao > {
    const localizacao = await this.repository.preload( {
      id: id,
      ...updateLocalizacaoDto,
    } );

    if ( !localizacao ) {
      throw new NotFoundException( `Localização com ID ${ id } não encontrada para atualizar` );
    }

    return this.repository.save( localizacao );
  }

  async remove( id: number ): Promise< void > {
    const local = await this.findOneById( id );
    await this.repository.remove( local );
  }
}