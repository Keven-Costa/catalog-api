import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity( { name: "usuarios" } )    
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty( { example: 'ADM' } )
    @Column( { length: 255, nullable: false } )
    nome: string;

    @ApiProperty( { example: 'adm@email.com' } )
    @Column( { length: 255, nullable: false, unique: true } )
    usuario: string;

    @ApiProperty( { example: 'adm1234' } )
    @Exclude() 
    @Column( { length: 255, nullable: false } )
    senha: string;
}