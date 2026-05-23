export const appConfig = {
  name: "Armazém de Ingredientes",
  description: "Painel de controle para gerenciamento de estoque e compartimentos.",
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
} as const;