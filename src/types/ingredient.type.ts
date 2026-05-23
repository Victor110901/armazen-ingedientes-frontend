export type TipoIngrediente = "SECO" | "LIQUIDO" | "REFRIGERADO";

export interface IngredienteResponse {
  id: number;
  nome: string;
  tipo: TipoIngrediente;
  quantidade: number;
  unidadeMedida: string;
  compartimentoId: number;
  compartimentoCodigo: string;
  responsavelUltimaMovimentacao: string;
  criadoEm: string;
  atualizadoEm: string | null;
}

export interface CriarIngredienteRequest {
  nome: string;
  tipo: TipoIngrediente;
  quantidade: number;
  compartimentoId: number;
  responsavel: string;
}

export interface MovimentarIngredienteRequest {
  quantidade: number;
  responsavel: string;
}

export interface VolumePorTipoResponse {
  type: TipoIngrediente;
  totalQuantity: number;
}