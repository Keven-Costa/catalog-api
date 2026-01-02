import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsIn } from "class-validator";

export class CreateLogDto {
  @ApiProperty({
    description: 'Tipo de operação (gerado automaticamente pelo sistema)',
    example: 'UPDATE',
    enum: ['CREATE', 'UPDATE', 'DELETE'], 
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['CREATE', 'UPDATE', 'DELETE']) // Mantenha o padrão técnico
  acao: string;

  @ApiProperty({
    description: 'Histórico de mudanças gerado pelo createDescription',
    example: 'Nome: de "Antigo" para "Novo"',
  })
  @IsString()
  @IsOptional()
  descricao_mudanca?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  item_id: number;
}