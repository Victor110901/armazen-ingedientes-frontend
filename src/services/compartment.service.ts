import type { CompartimentoDisponivelResponse } from "../types/compartment.types";
import type { TipoIngrediente } from "../types/ingredient.type";
import { api } from "./api";

export interface BuscarCompartimentosDisponiveisParams {
  quantidade: number;
  tipo: TipoIngrediente;
}

export async function buscarCompartimentosDisponiveis(
  params: BuscarCompartimentosDisponiveisParams,
): Promise<CompartimentoDisponivelResponse[]> {
  const response = await api.get<CompartimentoDisponivelResponse[]>(
    "/compartimentos/disponiveis",
    {
      params,
    },
  );

  return response.data;
}

export async function buscarCompartimentosDisponiveisParaVenda(
  tipo: TipoIngrediente,
): Promise<CompartimentoDisponivelResponse[]> {
  const response = await api.get<CompartimentoDisponivelResponse[]>(
    "/compartimentos/disponiveis-para-venda",
    {
      params: {
        tipo,
      },
    },
  );

  return response.data;
}