import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-logs_.dto';
import { Log } from './entities/logs_.entity';
import { LogResponseDto } from './dto/log-response.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository( Log )
    private readonly repository: Repository< Log >,
  ) {}

  private mapToResponse( log: Log ): LogResponseDto {
    return {
      id: log.id,
      acao: log.acao,
      descricao_mudanca: log.descricao_mudanca ? log.descricao_mudanca.split( '\n' ) : [],
      data_hora: log.data_hora.toLocaleString( 'pt-BR', {
        timeZone: 'America/Sao_Paulo',
      } ),
      item: {
        id: log.item?.id,
        nome: log.item?.nome,
      },
    } as any; 
  }

  async create( createLogDto: CreateLogDto ): Promise< LogResponseDto > {
    const novoLog = this.repository.create( {
      acao: createLogDto.acao,
      descricao_mudanca: createLogDto.descricao_mudanca,
      item: { id: createLogDto.item_id },
    } );
    
    const salvo = await this.repository.save( novoLog );
    const logCompleto = await this.findOneByIdRaw( salvo.id );
    return this.mapToResponse( logCompleto );
  }

  async findAll(): Promise< LogResponseDto[] > {
    const logs = await this.repository.find( {
      relations: [ 'item' ],
      order: { data_hora: 'DESC' },
    } );
    return logs.map( log => this.mapToResponse( log ) );
  }

  async findLogByNameItem( name: string ): Promise< LogResponseDto[] > {
    const logs = await this.repository.find( {
      where: { item: { nome: name } },
      relations: [ 'item' ],
      order: { data_hora: 'DESC' }
    } );

    if ( !logs || logs.length === 0 ) {
      throw new NotFoundException( `Nenhum log encontrado para o item: ${ name }` );
    }

    return logs.map( log => this.mapToResponse( log ) );
  }

  async findLogByIdItem( id: number ): Promise< LogResponseDto[] > {
    const logs = await this.repository.find( {
      where: { item: { id: id } },
      relations: [ 'item' ],
      order: { data_hora: 'DESC' }
    } );

    if ( !logs || logs.length === 0 ) {
      throw new NotFoundException( `Nenhum log encontrado para o item ID: ${ id }` );
    }

    return logs.map(log => this.mapToResponse( log ) );
  }

  async findOneById( id: number ): Promise< LogResponseDto > {
    const log = await this.findOneByIdRaw( id );
    return this.mapToResponse( log );
  }

  private async findOneByIdRaw( id: number ): Promise< Log > {
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
    const log = await this.findOneByIdRaw( id );
    await this.repository.remove( log );
  }

  async createDescription( antigo: any, novo: any ): Promise< string > {
    const mudancas: string[] = [];
    const campos: Record<string, string> = {
      nome: 'Nome',
      descricao: 'Descrição',
      valor_estimado: 'Valor estimado',
      data_aquisicao: 'Data de aquisição'
    };

    for ( const campo in campos ) {
      if ( antigo[ campo ] != novo[ campo ] ) {
        mudancas.push( `${ campos[ campo ] }: de "${ antigo[ campo ] || 'vazio' }" para "${ novo[ campo ] || 'vazio' }"` );
      }
    }

    if ( antigo.categoria?.id !== novo.categoria?.id ) {
      mudancas.push( `Categoria: de "${ antigo.categoria?.nome || 'nenhuma' }" para "${ novo.categoria?.nome || 'nenhuma' }"` );
    }

    if ( antigo.localizacao?.id !== novo.localizacao?.id ) {
      mudancas.push( `Localização: de "${ antigo.localizacao?.nome || 'nenhuma' }" para "${ novo.localizacao?.nome || 'nenhuma' }"` );
    }

    return mudancas.length > 0 ? mudancas.join( '\n' ) : 'Nenhuma alteração detectada.';
  }
}