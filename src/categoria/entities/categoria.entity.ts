import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity( 'categoria' )
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; 

  @ApiProperty()
  @Column()
  nome: string; 

  @ApiProperty()
  @Column( { type: 'text', nullable: true } )
  descricao: string; 

  @OneToMany( () => Item, ( item ) => item.categoria )
  @ApiProperty( { type: () => [ Item ] } )
  itens: Item[];
}