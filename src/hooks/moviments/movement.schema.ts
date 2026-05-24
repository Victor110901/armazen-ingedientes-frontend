import { z } from "zod";

export const movementSchema = z.object({
  ingredienteId: z
    .number({
      message: "Selecione um ingrediente.",
    })
    .int("Selecione um ingrediente válido.")
    .min(1, "Selecione um ingrediente válido."),

  quantidade: z
    .number({
      message: "A quantidade é obrigatória.",
    })
    .positive("A quantidade deve ser maior que zero."),

  responsavel: z
    .string()
    .min(1, "O responsável é obrigatório.")
    .max(100, "O responsável deve ter no máximo 100 caracteres."),
});

export type MovementFormData = z.infer<typeof movementSchema>;