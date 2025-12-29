import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity( { name: "usuarios" } )    
export class Usuario {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column( { length: 255, nullable: false } )
    nome: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @Column( { length: 255, nullable: false } )
    usuario: string

    @ApiProperty()
    @MinLength(8)
    @IsNotEmpty()
    @Column( { length: 255, nullable: false } )
    senha: string

}