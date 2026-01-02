import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Localizacao } from '../localizacao/entities/localizacao.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor( 
    @InjectRepository( Categoria ) private readonly catRepo: Repository< Categoria >,
    @InjectRepository( Localizacao ) private readonly locRepo: Repository< Localizacao >,
    @InjectRepository( Tag ) private readonly tagRepo: Repository< Tag >,
    @InjectRepository(Item) private readonly itemRepo: Repository< Item >,
  ) {}

  async onApplicationBootstrap() {
    const itensExistentes = await this.itemRepo.count();
    
    if ( itensExistentes === 0 ) {
      console.log( '🌱 Banco de dados vazio. Populando dados base e itens de teste...' );
      await this.popularBanco();
    }
  }

  private async popularBanco() {
    const catEletronicos = await this.catRepo.save( { nome: 'Eletrônicos' } );
    const catFerramentas = await this.catRepo.save( { nome: 'Ferramentas' } );

    const locAlmoxarifado = await this.locRepo.save( {  
      nome: 'Almoxarifado Central', 
      detalhes: 'Prateleira A1' 
    } );

    const tagUrgente = await this.tagRepo.save( { nome: 'Usado' } );
    const tagNovo = await this.tagRepo.save( { nome: 'Novo' } );

    const itens = this.itemRepo.create( [
      {
        nome: 'Arduino Uno R3',
        descricao: 'Placa de microcontrolador baseada no ATmega328P',
        valor_estimado: 85.50,
        data_aquisicao: new Date( '2024-03-20' ),
        categoria: catEletronicos, 
        localizacao: locAlmoxarifado,
        tags: [ tagNovo ] 
      },
      {
        nome: 'Multímetro Digital',
        descricao: 'Multímetro com holster protetor e LCD',
        valor_estimado: 120.00,
        data_aquisicao: new Date( '2024-01-15' ),
        categoria: catEletronicos,
        localizacao: locAlmoxarifado,
        tags: [ tagNovo ]
      },
      {
        nome: 'Furadeira de Impacto',
        descricao: 'Furadeira 500W profissional',
        valor_estimado: 350.99,
        categoria: catFerramentas,
        localizacao: locAlmoxarifado,
        tags: []
      }
    ]);

    await this.itemRepo.save( itens );

    console.log( '✅ Seeding finalizado: Categorias, Locais, Tags e Itens criados!' );
  }
}