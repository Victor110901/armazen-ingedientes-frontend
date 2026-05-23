import type { TipoIngrediente } from "../types/ingredient.type";

export const INGREDIENT_TYPE_LABEL: Record<TipoIngrediente, string> = {
  SECO: "Secos",
  LIQUIDO: "Líquidos",
  REFRIGERADO: "Refrigerados",
};

export const INGREDIENT_TYPE_UNIT: Record<TipoIngrediente, string> = {
  SECO: "kg",
  LIQUIDO: "L",
  REFRIGERADO: "kg",
};

export const INGREDIENT_TYPE_CAPACITY: Record<TipoIngrediente, number> = {
  SECO: 600,
  LIQUIDO: 500,
  REFRIGERADO: 400,
};

export const INGREDIENT_TYPE_OPTIONS = [
  {
    value: "SECO",
    label: "Secos",
    unit: "kg",
    capacity: 600,
  },
  {
    value: "LIQUIDO",
    label: "Líquidos",
    unit: "L",
    capacity: 500,
  },
  {
    value: "REFRIGERADO",
    label: "Refrigerados",
    unit: "kg",
    capacity: 400,
  },
] as const;