import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Localizacao } from '../../localizacao/entities/localizacao.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Imagem } from '../../imagem/entities/imagem.entity';
import { Log } from '../../logs_/entities/logs_.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity( 'item' )
export class Item {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column( { type: 'text', nullable: true } )
  descricao: string;

  @ApiProperty()
  @Column( { type: 'decimal', precision: 10, scale: 2, nullable: true } )
  valor_estimado: number;

  @ApiProperty()
  @Column( { type: 'date', nullable: true } )
  data_aquisicao: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty( { type: () => Categoria } ) 
  @ManyToOne( () => Categoria, ( categoria ) => categoria.itens )
  @JoinColumn( { name: 'categoria_id' } )
  categoria: Categoria;
  
  @ApiProperty()
  @ManyToOne( () => Localizacao, ( localizacao ) => localizacao.itens ) 
  @JoinColumn( { name: 'local_id' } )
  localizacao: Localizacao;

  @ApiProperty( { type: () => [ Imagem ] } ) 
  @OneToMany( () => Imagem, ( imagem ) => imagem.item )
  imagens: Imagem[];

  @ApiProperty()
  @OneToMany( () => Log, ( log ) => log.item )
  logs: Log[];

  @ApiProperty()
  @ManyToMany( () => Tag )
  @JoinTable( { name: 'item_tag' } )
  tags: Tag[];
}