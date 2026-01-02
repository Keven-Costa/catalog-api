import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateTagDto {
  @ApiProperty( {
    description: 'Nome da etiqueta para categorização de itens',
    example: 'Urgente',
  } )
  @IsString( { message: 'O nome da tag deve ser um texto' } )
  @IsNotEmpty( { message: 'O nome da tag não pode estar vazio' } )
  nome: string;
}