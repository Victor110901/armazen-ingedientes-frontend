import { useQuery } from "@tanstack/react-query";

import { listarHistorico, type HistoricoOrder, type HistoricoSortBy } from "../../services/history.service";
import { queryKeys } from "../../services/query-keys";

export function useHistoryQuery(
  sortBy: HistoricoSortBy = "date",
  order: HistoricoOrder = "desc",
) {
  return useQuery({
    queryKey: queryKeys.history.list(sortBy, order),
    queryFn: () => listarHistorico({ sortBy, order }),
  });
}