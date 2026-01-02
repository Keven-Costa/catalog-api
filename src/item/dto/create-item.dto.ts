import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateItemDto {
  @ApiProperty({
    description: 'Nome do item',
    example: 'Arduino Uno R3'
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do item é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'Descrição detalhada do item',
    example: 'Placa de microcontrolador baseada no ATmega328P',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Valor estimado de mercado ou compra',
    example: 85.50,
    required: false
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  valor_estimado?: number;

  @ApiProperty({
    description: 'Data em que o item foi adquirido (ISO 8601)',
    example: '2024-03-20T10:00:00Z',
    required: false
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date) 
  data_aquisicao?: Date;

  @ApiProperty({
    description: 'ID da categoria vinculada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  categoria_id: number;

  @ApiProperty({
    description: 'ID da localização física',
    example: 2
  })
  @IsNumber()
  @IsNotEmpty()
  local_id: number;

  @ApiProperty({
    description: 'Lista de IDs das tags para classificação',
    example: [1, 2, 5],
    type: [Number],
    required: false
  })
  @IsArray()
  @IsNumber({}, { each: true }) 
  @IsOptional()
  tag_ids?: number[];
}