import { Clock } from "lucide-react";
import type { HistoricoMovimentacaoResponse } from "../../types/history.types";
import { EmptyState } from "../../components/common/EmptyState";
import { formatDateTime, formatQuantity } from "../../utils/formatters";
import { OperationBadge } from "../../components/common/OperationBadge";
import { IngredientTypeBadge } from "../../components/common/IngredientTypeBadge";

interface HistoryTableProps {
  history: HistoricoMovimentacaoResponse[];
}

export function HistoryTable({ history }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <EmptyState
        title="Nenhuma movimentação encontrada"
        message="As entradas e saídas registradas aparecerão nesta tela."
        icon={Clock}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Histórico completo
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Registro detalhado das entradas e saídas do armazém.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Data</th>
              <th className="px-6 py-4 font-semibold">Operação</th>
              <th className="px-6 py-4 font-semibold">Ingrediente</th>
              <th className="px-6 py-4 font-semibold">Tipo</th>
              <th className="px-6 py-4 font-semibold">Quantidade</th>
              <th className="px-6 py-4 font-semibold">Compartimento</th>
              <th className="px-6 py-4 font-semibold">Responsável</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.map((movement) => (
              <tr
                key={movement.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-6 py-4 text-slate-600">
                  {formatDateTime(movement.dataHora)}
                </td>

                <td className="px-6 py-4">
                  <OperationBadge operation={movement.tipoOperacao} />
                </td>

                <td className="px-6 py-4">
                  <strong className="font-semibold text-slate-950">
                    {movement.nomeIngrediente}
                  </strong>
                  {movement.ingredienteId && (
                    <p className="mt-1 text-xs text-slate-500">
                      ID #{movement.ingredienteId}
                    </p>
                  )}
                </td>

                <td className="px-6 py-4">
                  <IngredientTypeBadge type={movement.tipoIngrediente} />
                </td>

                <td className="px-6 py-4 font-semibold text-slate-900">
                  {formatQuantity(
                    movement.quantidade,
                    movement.tipoIngrediente,
                  )}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {movement.compartimentoCodigo}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {movement.responsavel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}