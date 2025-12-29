import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity( 'localizacao' )
export class Localizacao {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; 

  @ApiProperty()
  @Column()
  nome: string; 

  @ApiProperty()
  @Column( { type: 'text', nullable: true } )
  detalhes: string; 

  @ApiProperty()
  @OneToMany( () => Item, ( item ) => item.localizacao )
  itens: Item[];


}