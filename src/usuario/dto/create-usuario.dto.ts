import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty( { 
        description: 'Nome completo do usuário', 
        example: 'Keven Costa' 
    } )
    @IsString()
    @IsNotEmpty( { message: 'O nome é obrigatório' } )
    nome: string;

    @ApiProperty( { 
        description: 'E-mail que será usado como login', 
        example: 'usuario@email.com' 
    } )
    @IsEmail( {}, { message: 'Informe um e-mail válido' } )
    @IsNotEmpty()
    usuario: string;

    @ApiProperty( { 
        description: 'Senha de acesso (mínimo 8 caracteres)', 
        example: 'senha@123',
        minLength: 8 
    } )
    @IsString()
    @IsNotEmpty()
    @MinLength( 8, { message: 'A senha deve ter no mínimo 8 caracteres' } )
    senha: string;
}