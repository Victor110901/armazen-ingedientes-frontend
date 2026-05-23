
import { INGREDIENT_TYPE_LABEL, INGREDIENT_TYPE_UNIT } from "../config/domain.config";
import type { TipoIngrediente } from "../types/ingredient.type";


export function formatQuantity(value: number, type: TipoIngrediente): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })} ${INGREDIENT_TYPE_UNIT[type]}`;
}

export function formatIngredientType(type: TipoIngrediente): string {
  return INGREDIENT_TYPE_LABEL[type];
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatDate(value: string | null): string {
  if (!value) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date(value));
}