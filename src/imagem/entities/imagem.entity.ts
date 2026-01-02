import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity( 'imagem' )
export class Imagem {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  url_imagem: string; 

  @Column( { default: false } )
  eh_principal: boolean; 

  @ManyToOne( () => Item, ( item ) => item.imagens )
  @JoinColumn( { name: 'item_id' } )
  item: Item; 
}