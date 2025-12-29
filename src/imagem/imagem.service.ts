import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImagenDto } from './dto/create-imagem.dto';
import { UpdateImagenDto } from './dto/update-imagem.dto';
import { Imagem } from './entities/imagem.entity';

@Injectable()
export class ImagemService {
  constructor(
    @InjectRepository( Imagem )
    private readonly repository: Repository< Imagem >,
  ) {}

  async create( createImagenDto: CreateImagenDto ): Promise< Imagem > {
    const novaImagem = this.repository.create( {
      url_imagem: createImagenDto.url_imagem,
      eh_principal: createImagenDto.eh_principal,
      item: { id: createImagenDto.item_id }, 
    } );
    
    return this.repository.save( novaImagem );
  }

  async findAll(): Promise< Imagem[] > {
    return this.repository.find( {
      relations: [ 'item' ],
    } );
  }

  async findOneById( id: number ): Promise< Imagem > {
    const imagem = await this.repository.findOne( { 
      where: { id },
      relations: [ 'item' ] 
    } );

    if ( !imagem ) {
      throw new NotFoundException( `Imagem com ID ${ id } não encontrada` );
    }
    
    return imagem;
  }

  async update( id: number, updateImagenDto: UpdateImagenDto ): Promise< Imagem > {
    const imagem = await this.repository.preload( {
      id: id,
      ...updateImagenDto,
      item: updateImagenDto.item_id ? { id: updateImagenDto.item_id } : undefined,
    });

    if ( !imagem ) {
      throw new NotFoundException( `Imagem com ID ${ id } não encontrada para atualizar` );
    }

    return this.repository.save( imagem );
  }

  async remove( id: number ): Promise< void > {
    const imagem = await this.findOneById( id );
    await this.repository.remove( imagem );
  }
}