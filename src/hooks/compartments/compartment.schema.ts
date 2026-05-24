import { z } from "zod";

export const storageAvailabilitySchema = z.object({
  tipo: z.enum(["SECO", "LIQUIDO", "REFRIGERADO"], {
    message: "Selecione um tipo de ingrediente.",
  }),

  quantidade: z
    .number({
      message: "A quantidade é obrigatória.",
    })
    .positive("A quantidade deve ser maior que zero."),
});

export type StorageAvailabilityFormData = z.infer<
  typeof storageAvailabilitySchema
>;

export const saleAvailabilitySchema = z.object({
  tipo: z.enum(["SECO", "LIQUIDO", "REFRIGERADO"], {
    message: "Selecione um tipo de ingrediente.",
  }),
});

export type SaleAvailabilityFormData = z.infer<typeof saleAvailabilitySchema>;