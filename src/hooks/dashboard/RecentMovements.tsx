import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { HistoricoMovimentacaoResponse } from "../../types/history.types";
import { EmptyState } from "../../components/common/EmptyState";
import { OperationBadge } from "../../components/common/OperationBadge";
import { IngredientTypeBadge } from "../../components/common/IngredientTypeBadge";
import { formatDateTime, formatQuantity } from "../../utils/formatters";

interface RecentMovementsProps {
  movements: HistoricoMovimentacaoResponse[];
}

export function RecentMovements({ movements }: RecentMovementsProps) {
  const recentMovements = movements.slice(0, 5);

  if (recentMovements.length === 0) {
    return (
      <EmptyState
        title="Nenhuma movimentação registrada"
        message="As entradas e saídas aparecerão aqui assim que forem registradas."
      />
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Últimas movimentações
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Histórico recente de entradas e saídas do armazém.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {recentMovements.map((movement) => {
          const isEntry = movement.tipoOperacao === "ENTRADA";
          const Icon = isEntry ? ArrowUpCircle : ArrowDownCircle;

          return (
            <article
              key={movement.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Icon className="size-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-semibold text-slate-950">
                      {movement.nomeIngrediente}
                    </strong>
                    <OperationBadge operation={movement.tipoOperacao} />
                    <IngredientTypeBadge type={movement.tipoIngrediente} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {movement.compartimentoCodigo} • {movement.responsavel} •{" "}
                    {formatDateTime(movement.dataHora)}
                  </p>
                </div>
              </div>

              <strong className="text-sm font-semibold text-slate-950">
                {formatQuantity(movement.quantidade, movement.tipoIngrediente)}
              </strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}