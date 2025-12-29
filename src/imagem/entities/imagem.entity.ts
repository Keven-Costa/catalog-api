import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity( 'imagem' )
export class Imagem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; 

  @ApiProperty()
  @Column()
  url_imagem: string; 

  @ApiProperty()
  @Column( { default: false } )
  eh_principal: boolean; 

  @ApiProperty( { type: () => Item } )
  @ManyToOne( () => Item, ( item ) => item.imagens, { onDelete: 'CASCADE' } )
  @JoinColumn( { name: 'item_id' } )
  item: Item; 
}