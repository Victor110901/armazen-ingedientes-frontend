import { api } from "./api";

import type { HistoricoMovimentacaoResponse } from "../types/history.types";

export type HistoricoSortBy = "date" | "compartimento";
export type HistoricoOrder = "asc" | "desc";

export interface ListarHistoricoParams {
  sortBy?: HistoricoSortBy;
  order?: HistoricoOrder;
}

export async function listarHistorico(
  params: ListarHistoricoParams = {},
): Promise<HistoricoMovimentacaoResponse[]> {
  const response = await api.get<HistoricoMovimentacaoResponse[]>("/historico", {
    params,
  });

  return response.data;
}