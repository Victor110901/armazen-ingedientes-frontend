import type { TipoIngrediente } from "./ingredient.type";

export interface CompartimentoDisponivelResponse {
  id: number;
  codigo: string;
  tipoAtual: TipoIngrediente | null;
  ultimoTipoArmazenado: TipoIngrediente | null;
  quantidadeAtual: number;
  capacidadeMaxima: number;
  espacoDisponivel: number;
  ultimaDataArmazenamento: string | null;
  disponivel: boolean;
  motivo: string;
}