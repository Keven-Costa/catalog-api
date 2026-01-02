import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateLocalizacaoDto {
  @ApiProperty( {
    description: 'Nome do local físico onde os itens são armazenados',
    example: 'Almoxarifado Central - Prateleira A4',
  } )
  @IsString( { message: 'O nome da localização deve ser um texto' } )
  @IsNotEmpty( { message: 'O nome da localização é obrigatório' } )
  @Length( 3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' } )
  nome: string;

  @ApiProperty( {
    description: 'Detalhes adicionais ou pontos de referência para facilitar a busca',
    example: 'Ao lado da porta de vidro, segundo andar',
    required: false,
  } )
  @IsString( { message: 'Os detalhes devem ser um texto' } )
  @IsOptional()
  detalhes?: string;
}