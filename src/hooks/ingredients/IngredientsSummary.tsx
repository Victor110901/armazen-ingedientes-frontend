import { Boxes, ClipboardList, PackageCheck } from "lucide-react";

import type { IngredienteResponse } from "../../types/ingredient.type";
import { MetricCard } from "../../components/common/MetricCard";

interface IngredientsSummaryProps {
  ingredients: IngredienteResponse[];
}

export function IngredientsSummary({ ingredients }: IngredientsSummaryProps) {
  const totalStored = ingredients.reduce(
    (total, ingredient) => total + ingredient.quantidade,
    0,
  );

  const activeCompartments = new Set(
    ingredients.map((ingredient) => ingredient.compartimentoCodigo),
  ).size;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Ingredientes"
        value={String(ingredients.length)}
        description="Total de itens cadastrados."
        icon={ClipboardList}
      />

      <MetricCard
        title="Compartimentos ativos"
        value={`${activeCompartments}/5`}
        description="Compartimentos atualmente ocupados."
        icon={Boxes}
      />

      <MetricCard
        title="Volume total"
        value={totalStored.toLocaleString("pt-BR", {
          maximumFractionDigits: 3,
        })}
        description="Soma das quantidades registradas no estoque."
        icon={PackageCheck}
      />
    </div>
  );
}