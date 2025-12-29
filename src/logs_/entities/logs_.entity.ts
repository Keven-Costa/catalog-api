import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity( 'logs' )
export class Log {
  @PrimaryGeneratedColumn()
  id: number; 

  
  @Column()
  acao: string; 

  
  @Column( { type: 'text', nullable: true } )
  descricao_mudanca: string; 

  
  @CreateDateColumn()
  timestamp: Date; 

  
  @ManyToOne( () => Item, ( item ) => item.logs )
  @JoinColumn( { name: 'item_id' } )
  item: Item; 
}