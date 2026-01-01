export class LogResponseDto {
  id: number;
  acao: string;
  timestamp: string;
  descricao_mudanca?: string;
  item: {
    id: number;
    nome: string;
  };
}
