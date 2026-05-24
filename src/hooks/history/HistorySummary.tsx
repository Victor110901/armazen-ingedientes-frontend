import { ArrowDownCircle, ArrowUpCircle, History } from "lucide-react";
import type { HistoricoMovimentacaoResponse } from "../../types/history.types";
import { MetricCard } from "../../components/common/MetricCard";

interface HistorySummaryProps {
  history: HistoricoMovimentacaoResponse[];
}

export function HistorySummary({ history }: HistorySummaryProps) {
  const entries = history.filter(
    (movement) => movement.tipoOperacao === "ENTRADA",
  ).length;

  const exits = history.filter(
    (movement) => movement.tipoOperacao === "SAIDA",
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Movimentações"
        value={String(history.length)}
        description="Total de registros no histórico."
        icon={History}
      />

      <MetricCard
        title="Entradas"
        value={String(entries)}
        description="Movimentações de entrada registradas."
        icon={ArrowUpCircle}
      />

      <MetricCard
        title="Saídas"
        value={String(exits)}
        description="Movimentações de saída registradas."
        icon={ArrowDownCircle}
      />
    </div>
  );
}