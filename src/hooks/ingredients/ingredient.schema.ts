import { z } from "zod";

export const createIngredientSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome do ingrediente é obrigatório.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),

  tipo: z.enum(["SECO", "LIQUIDO", "REFRIGERADO"], {
    message: "Selecione um tipo de ingrediente.",
  }),

  quantidade: z
    .number({
      message: "A quantidade é obrigatória.",
    })
    .positive("A quantidade deve ser maior que zero."),

  compartimentoId: z
    .number({
      message: "O compartimento é obrigatório.",
    })
    .int("Selecione um compartimento válido.")
    .min(1, "Selecione um compartimento válido."),

  responsavel: z
    .string()
    .min(1, "O responsável é obrigatório.")
    .max(100, "O responsável deve ter no máximo 100 caracteres."),
});

export type CreateIngredientFormData = z.infer<typeof createIngredientSchema>;