import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-logs_.dto';
import { Log } from './entities/logs_.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository( Log )
    private readonly repository: Repository< Log >,
  ) {}

  async create( createLogDto: CreateLogDto ): Promise< Log > {
    const novoLog = this.repository.create( {
      acao: createLogDto.acao,
      descricao_mudanca: createLogDto.descricao_mudanca,
      item: { id: createLogDto.item_id }, 
    });
    
    return this.repository.save(novoLog);
  }

  async findAll(): Promise< Log[] > {
    return this.repository.find( {
      relations: [ 'item' ],
      order: { timestamp: 'DESC' },
    });
  }

  async findOneById( id: number ): Promise< Log > {
    const log = await this.repository.findOne( {
      where: { id },
      relations: [ 'item' ],
    } );

    if ( !log ) {
      throw new NotFoundException( `Log com ID ${ id } não encontrado` );
    }

    return log;
  }

  async remove( id: number ): Promise< void > {
    const log = await this.findOneById( id );
    await this.repository.remove( log );
  }
}