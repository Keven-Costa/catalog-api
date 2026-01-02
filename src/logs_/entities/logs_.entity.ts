import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  data_hora: Date; 

  @ApiProperty()
  @ManyToOne( () => Item, { onDelete: 'SET NULL', nullable: true } )
  @JoinColumn( { name: 'item_id' } )
  item: Item;
}