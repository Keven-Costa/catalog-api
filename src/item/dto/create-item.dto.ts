export class CreateItemDto {
  nome: string;
  descricao?: string;
  valor_estimado?: number;
  data_aquisicao?: Date;
  categoria_id: number;
  local_id: number;
  tag_ids?: number[];
}