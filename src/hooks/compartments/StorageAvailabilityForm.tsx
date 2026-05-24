import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { storageAvailabilitySchema, type StorageAvailabilityFormData } from "./compartment.schema";
import { INGREDIENT_TYPE_OPTIONS } from "../../config/domain.config";

interface StorageAvailabilityFormProps {
  onSubmit: (data: StorageAvailabilityFormData) => void;
  isLoading?: boolean;
}

export function StorageAvailabilityForm({
  onSubmit,
  isLoading = false,
}: StorageAvailabilityFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StorageAvailabilityFormData>({
    resolver: zodResolver(storageAvailabilitySchema),
    defaultValues: {
      tipo: "SECO",
      quantidade: 100,
    },
  });

  const selectedType = watch("tipo");
  const selectedTypeConfig = INGREDIENT_TYPE_OPTIONS.find(
    (option) => option.value === selectedType,
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">
          Disponíveis para armazenamento
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Informe o tipo e a quantidade para encontrar compartimentos compatíveis.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start">
        <div>
          <label className="text-sm font-medium text-slate-700">Tipo</label>
          <select
            {...register("tipo")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {INGREDIENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — {option.capacity} {option.unit}
              </option>
            ))}
          </select>

          {errors.tipo && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.tipo.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Quantidade
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            placeholder={`Quantidade em ${selectedTypeConfig?.unit ?? ""}`}
            {...register("quantidade", { valueAsNumber: true })}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {errors.quantidade && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.quantidade.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 md:min-w-36"
        >
          <Search className="size-4" />
          Consultar
        </button>
      </div>
    </form>
  );
}