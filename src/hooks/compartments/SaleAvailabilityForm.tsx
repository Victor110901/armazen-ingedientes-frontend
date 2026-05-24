import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { saleAvailabilitySchema, type SaleAvailabilityFormData } from "./compartment.schema";
import { INGREDIENT_TYPE_OPTIONS } from "../../config/domain.config";

interface SaleAvailabilityFormProps {
  onSubmit: (data: SaleAvailabilityFormData) => void;
  isLoading?: boolean;
}

export function SaleAvailabilityForm({
  onSubmit,
  isLoading = false,
}: SaleAvailabilityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaleAvailabilityFormData>({
    resolver: zodResolver(saleAvailabilitySchema),
    defaultValues: {
      tipo: "SECO",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">
          Disponíveis para venda/retirada
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Consulte compartimentos que possuem estoque disponível por tipo.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <label className="text-sm font-medium text-slate-700">Tipo</label>
          <select
            {...register("tipo")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {INGREDIENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {errors.tipo && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.tipo.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 md:min-w-36"
        >
          <Search className="size-4" />
          Consultar
        </button>
      </div>
    </form>
  );
}