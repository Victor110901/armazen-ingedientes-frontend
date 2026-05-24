import type { TipoIngrediente } from "../../types/ingredient.type";
import { cn } from "../../utils/cn";
import { formatIngredientType } from "../../utils/formatters";

interface IngredientTypeBadgeProps {
  type: TipoIngrediente;
}

const badgeStyles: Record<TipoIngrediente, string> = {
  SECO: "bg-amber-50 text-amber-700 border-amber-200",
  LIQUIDO: "bg-blue-50 text-blue-700 border-blue-200",
  REFRIGERADO: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function IngredientTypeBadge({ type }: IngredientTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
        badgeStyles[type],
      )}
    >
      {formatIngredientType(type)}
    </span>
  );
}