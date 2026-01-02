import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Localizacao } from '../../localizacao/entities/localizacao.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Imagem } from '../../imagem/entities/imagem.entity';
import { Log } from '../../logs_/entities/logs_.entity';

@Entity( 'item' )
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column( { type: 'text', nullable: true } )
  descricao: string;

  @Column( { type: 'decimal', precision: 10, scale: 2, nullable: true } )
  valor_estimado: number;

  @Column( { type: 'date', nullable: true } )
  data_aquisicao: Date;

  @CreateDateColumn()
  created_at: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne( () => Categoria, ( categoria ) => categoria.itens )
  @JoinColumn( { name: 'categoria_id' } )
  categoria: Categoria;
  
  @ManyToOne( () => Localizacao, ( localizacao ) => localizacao.itens ) 
  @JoinColumn( { name: 'local_id' } )
  localizacao: Localizacao;

  @OneToMany( () => Imagem, ( imagem ) => imagem.item )
  imagens: Imagem[];

  @ManyToMany( () => Tag, (tag) => tag.itens )
  @JoinTable( {
    name: 'item_tag', 
    joinColumns: [{ name: 'item_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }]
  } )
  tags: Tag[];

  @OneToMany( () => Log, ( log ) => log.item )
  logs: Log[]; // Verifique se Log está importado corretamente
}