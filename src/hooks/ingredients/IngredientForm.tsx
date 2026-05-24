import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PackagePlus } from "lucide-react";
import { useForm } from "react-hook-form";

import { INGREDIENT_TYPE_OPTIONS } from "../../config/domain.config";
import { useCreateIngredientMutation } from "./useIngredients";
import { createIngredientSchema, type CreateIngredientFormData } from "./ingredient.schema";

const compartmentOptions = [
  { id: 1, codigo: "C1" },
  { id: 2, codigo: "C2" },
  { id: 3, codigo: "C3" },
  { id: 4, codigo: "C4" },
  { id: 5, codigo: "C5" },
];

export function IngredientForm() {
  const createIngredientMutation = useCreateIngredientMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateIngredientFormData>({
    resolver: zodResolver(createIngredientSchema),
    defaultValues: {
      nome: "",
      tipo: "SECO",
      quantidade: 0,
      compartimentoId: 1,
      responsavel: "",
    },
  });

  const selectedType = watch("tipo");
  const selectedTypeConfig = INGREDIENT_TYPE_OPTIONS.find(
    (option) => option.value === selectedType,
  );

  function onSubmit(data: CreateIngredientFormData) {
    createIngredientMutation.mutate(data, {
      onSuccess: () => {
        reset({
          nome: "",
          tipo: "SECO",
          quantidade: 0,
          compartimentoId: 1,
          responsavel: "",
        });
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <PackagePlus className="size-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Cadastrar ingrediente
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Registre um novo ingrediente em um dos compartimentos disponíveis.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Nome do ingrediente
          </label>
          <input
            type="text"
            placeholder="Ex: Farinha de trigo"
            {...register("nome")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          {errors.nome && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Tipo
          </label>
          <select
            {...register("tipo")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {INGREDIENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — capacidade {option.capacity} {option.unit}
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

        <div>
          <label className="text-sm font-medium text-slate-700">
            Compartimento
          </label>
          <select
            {...register("compartimentoId", { valueAsNumber: true })}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {compartmentOptions.map((compartment) => (
              <option key={compartment.id} value={compartment.id}>
                {compartment.codigo}
              </option>
            ))}
          </select>
          {errors.compartimentoId && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.compartimentoId.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Responsável
          </label>
          <input
            type="text"
            placeholder="Ex: Pedro"
            {...register("responsavel")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          {errors.responsavel && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.responsavel.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={createIngredientMutation.isPending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {createIngredientMutation.isPending && (
          <Loader2 className="size-4 animate-spin" />
        )}
        Cadastrar ingrediente
      </button>
    </form>
  );
}