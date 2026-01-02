import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity( 'categoria' )
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  nome: string; 
  
  @Column( { type: 'text', nullable: true } )
  descricao: string; 

  @OneToMany( () => Item, ( item ) => item.categoria )
  itens: Item[];
}