
import { INGREDIENT_TYPE_LABEL, INGREDIENT_TYPE_UNIT } from "../config/domain.config";
import type { TipoIngrediente } from "../types/ingredient.type";


function normalizeNumericValue(value: number | string): number {
  if (typeof value === "number") {
    return value;
  }

  const normalizedValue = value.trim();

  if (normalizedValue.includes(",") && normalizedValue.includes(".")) {
    return Number(normalizedValue.replace(/\./g, "").replace(",", "."));
  }

  return Number(normalizedValue.replace(",", "."));
}

function formatNumericValue(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}

export function formatQuantity(value: number | string, type: TipoIngrediente): string {
  const quantity = normalizeNumericValue(value);

  return `${formatNumericValue(quantity)} ${INGREDIENT_TYPE_UNIT[type]}`;
}

export function formatQuantitiesInText(value: string): string {
  return value.replace(
    /(^|[^\w])(-?\d+(?:[.,]\d+)?)(\s*)(kg|l)\b/gi,
    (match, prefix: string, numericValue: string, _space: string, unit: string) => {
      const quantity = normalizeNumericValue(numericValue);

      if (!Number.isFinite(quantity)) {
        return match;
      }

      const formattedUnit = unit.toLowerCase() === "l" ? "L" : "kg";

      return `${prefix}${formatNumericValue(quantity)} ${formattedUnit}`;
    },
  );
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
