import type { IngredienteResponse } from "../../types/ingredient.type";
import { MovementForm } from "./MovementForm";

interface MovementsPanelProps {
  ingredients: IngredienteResponse[];
}

export function MovementsPanel({ ingredients }: MovementsPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <MovementForm ingredients={ingredients} operation="entrada" />
      <MovementForm ingredients={ingredients} operation="saida" />
    </div>
  );
}