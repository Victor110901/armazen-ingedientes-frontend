import type { HistoricoOrder, HistoricoSortBy } from "../../services/history.service";

interface HistoryFiltersProps {
  sortBy: HistoricoSortBy;
  order: HistoricoOrder;
  onSortByChange: (value: HistoricoSortBy) => void;
  onOrderChange: (value: HistoricoOrder) => void;
  isFetching?: boolean;
}

export function HistoryFilters({
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
  isFetching = false,
}: HistoryFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Filtros e ordenação
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Organize o histórico por data ou compartimento para acompanhar as
            movimentações do armazém.
          </p>
        </div>

        {isFetching && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Atualizando...
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Ordenar por
          </label>

          <select
            value={sortBy}
            onChange={(event) =>
              onSortByChange(event.target.value as HistoricoSortBy)
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="date">Data da movimentação</option>
            <option value="compartimento">Compartimento</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Ordem</label>

          <select
            value={order}
            onChange={(event) =>
              onOrderChange(event.target.value as HistoricoOrder)
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="desc">Decrescente</option>
            <option value="asc">Crescente</option>
          </select>
        </div>
      </div>
    </section>
  );
}