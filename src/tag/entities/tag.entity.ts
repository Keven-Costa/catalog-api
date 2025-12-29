import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity( 'tag' )
export class Tag {
  
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  nome: string;

  
  @Column( { nullable: true } )
  cor_hex: string;

  
  @ManyToMany( () => Item, ( item ) => item.tags )
  itens: Item[];
}