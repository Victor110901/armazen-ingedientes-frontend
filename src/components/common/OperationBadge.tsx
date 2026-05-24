import type { TipoOperacao } from "../../types/history.types";
import { cn } from "../../utils/cn";

interface OperationBadgeProps {
  operation: TipoOperacao;
}

export function OperationBadge({ operation }: OperationBadgeProps) {
  const isEntry = operation === "ENTRADA";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
        isEntry
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700",
      )}
    >
      {isEntry ? "Entrada" : "Saída"}
    </span>
  );
}