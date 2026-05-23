import type { TipoIngrediente } from "./ingredient.type";

export type TipoOperacao = "ENTRADA" | "SAIDA";

export interface HistoricoMovimentacaoResponse {
  id: number;
  dataHora: string;
  tipoOperacao: TipoOperacao;
  quantidade: number;
  tipoIngrediente: TipoIngrediente;
  nomeIngrediente: string;
  responsavel: string;
  compartimentoId: number;
  compartimentoCodigo: string;
  ingredienteId: number | null;
}