import { useQuery } from "@tanstack/react-query";

import {
    buscarCompartimentosDisponiveis,
    buscarCompartimentosDisponiveisParaVenda,
    type BuscarCompartimentosDisponiveisParams
} from "../../services/compartment.service";
import { queryKeys } from "../../services/query-keys";
import type { TipoIngrediente } from "../../types/ingredient.type";

export function useAvailableCompartmentsQuery(
  params: BuscarCompartimentosDisponiveisParams,
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.compartments.available(params.quantidade, params.tipo),
    queryFn: () => buscarCompartimentosDisponiveis(params),
    enabled,
  });
}

export function useAvailableCompartmentsForSaleQuery(
  tipo: TipoIngrediente,
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.compartments.availableForSale(tipo),
    queryFn: () => buscarCompartimentosDisponiveisParaVenda(tipo),
    enabled,
  });
}