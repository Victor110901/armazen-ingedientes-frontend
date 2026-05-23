export const queryKeys = {
  health: ["health"] as const,

  ingredients: {
    all: ["ingredients"] as const,
    detail: (id: number) => ["ingredients", id] as const,
    volume: ["ingredients", "volume"] as const,
  },

  compartments: {
    available: (quantidade: number, tipo: string) =>
      ["compartments", "available", quantidade, tipo] as const,
    availableForSale: (tipo: string) =>
      ["compartments", "available-for-sale", tipo] as const,
  },

  history: {
    all: ["history"] as const,
    list: (sortBy: string, order: string) =>
      ["history", sortBy, order] as const,
  },
} as const;