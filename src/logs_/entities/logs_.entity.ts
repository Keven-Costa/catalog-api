import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity( 'logs' )
export class Log {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; 

  @ApiProperty()
  @Column()
  acao: string; 

  @ApiProperty()
  @Column( { type: 'text', nullable: true } )
  descricao_mudanca: string; 

  @ApiProperty()
  @CreateDateColumn()
  timestamp: Date; 

  @ApiProperty()
  @ManyToOne( () => Item, ( item ) => item.logs )
  @JoinColumn( { name: 'item_id' } )
  item: Item; 
}