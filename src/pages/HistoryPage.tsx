import { useState } from "react";
import type { HistoricoOrder, HistoricoSortBy } from "../services/history.service";
import { useHistoryQuery } from "../hooks/history/useHistory";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { HistorySummary } from "../hooks/history/HistorySummary";
import { HistoryFilters } from "../hooks/history/HistoryFilters";
import { HistoryTable } from "../hooks/history/HistoryTable";

export function HistoryPage() {
  const [sortBy, setSortBy] = useState<HistoricoSortBy>("date");
  const [order, setOrder] = useState<HistoricoOrder>("desc");

  const historyQuery = useHistoryQuery(sortBy, order);

  if (historyQuery.isLoading) {
    return <LoadingState message="Carregando histórico..." />;
  }

  if (historyQuery.isError) {
    return (
      <ErrorState
        title="Não foi possível carregar o histórico"
        message="Verifique se a API está disponível e tente novamente."
      />
    );
  }

  const history = historyQuery.data ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Histórico
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Histórico de movimentações
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Acompanhe entradas, saídas, responsáveis, ingredientes e
            compartimentos movimentados no armazém.
          </p>
        </div>

        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {history.length} registro(s)
        </div>
      </div>

      <HistorySummary history={history} />

      <HistoryFilters
        sortBy={sortBy}
        order={order}
        onSortByChange={setSortBy}
        onOrderChange={setOrder}
        isFetching={historyQuery.isFetching}
      />

      <HistoryTable history={history} />
    </section>
  );
}