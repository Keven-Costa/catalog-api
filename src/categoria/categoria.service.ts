import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository( Categoria )
    private readonly repository: Repository< Categoria >,
  ) {}

  async create( createCategoriaDto: CreateCategoriaDto ): Promise< Categoria > {
    const categoria = this.repository.create( createCategoriaDto );
    return this.repository.save( categoria );
  }

  async findAll(): Promise< Categoria[] > {
    return  this.repository.find();
  }

  async findOneById( id: number ): Promise< Categoria > {
    const categoria = await this.repository.findOneBy( { id } );
    if ( !categoria ) {
      throw new NotFoundException( `Categoria com ID ${ id } não encontrada` );
    }
    return categoria;
  }

  async findOneByName( name: string ): Promise< Categoria > {
    const categoria = await this.repository.findOne({
      where: { nome: name },
    });

    if ( !categoria ) {
      throw new NotFoundException( `Categoria '${ name }' não encontrada` );
    }

    return categoria;
  }

  async update( id: number, updateCategoriaDto: UpdateCategoriaDto ): Promise< Categoria > {
    const categoria = await this.findOneById( id );
    this.repository.merge( categoria, updateCategoriaDto );
    return this.repository.save( categoria );
  }

  async remove( id: number ): Promise< void > {
    const categoria = await this.findOneById( id );
    await this.repository.remove( categoria );
  }
}