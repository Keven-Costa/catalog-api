import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity( 'localizacao' )
export class Localizacao {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  nome: string; 

  @Column( { type: 'text', nullable: true } )
  detalhes: string; 

  @OneToMany( () => Item, ( item ) => item.localizacao )
  itens: Item[];
}