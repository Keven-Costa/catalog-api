import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty( {
    description: 'Nome da categoria (ex: Ferramentas, Eletrônicos)',
    example: 'Escritório'
  } )
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty( {
    description: 'Breve descrição sobre o que compõe esta categoria',
    example: 'Móveis e suprimentos para escritório',
    required: false 
  } )
  @IsString()
  @IsOptional()
  descricao?: string;
}