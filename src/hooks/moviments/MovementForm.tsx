import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type { MovementOperation } from "./movement.types";
import type { IngredienteResponse } from "../../types/ingredient.type";
import { useAddIngredientEntryMutation, useRegisterIngredientExitMutation } from "../ingredients/useIngredients";
import { movementSchema, type MovementFormData } from "./movement.schema";
import { IngredientTypeBadge } from "../../components/common/IngredientTypeBadge";
import { formatQuantity } from "../../utils/formatters";

interface MovementFormProps {
  ingredients: IngredienteResponse[];
  operation: MovementOperation;
}

export function MovementForm({ ingredients, operation }: MovementFormProps) {
  const isEntry = operation === "entrada";

  const addEntryMutation = useAddIngredientEntryMutation();
  const registerExitMutation = useRegisterIngredientExitMutation();

  const isPending = addEntryMutation.isPending || registerExitMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MovementFormData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      ingredienteId: ingredients[0]?.id ?? 0,
      quantidade: 0,
      responsavel: "",
    },
  });

  const selectedIngredientId = watch("ingredienteId");
  const selectedIngredient = ingredients.find(
    (ingredient) => ingredient.id === selectedIngredientId,
  );

  function onSubmit(data: MovementFormData) {
    const payload = {
      quantidade: data.quantidade,
      responsavel: data.responsavel,
    };

    if (isEntry) {
      addEntryMutation.mutate(
        {
          id: data.ingredienteId,
          data: payload,
        },
        {
          onSuccess: () => {
            reset({
              ingredienteId: data.ingredienteId,
              quantidade: 0,
              responsavel: "",
            });
          },
        },
      );

      return;
    }

    registerExitMutation.mutate(
      {
        id: data.ingredienteId,
        data: payload,
      },
      {
        onSuccess: () => {
          reset({
            ingredienteId: data.ingredienteId,
            quantidade: 0,
            responsavel: "",
          });
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div
          className={
            isEntry
              ? "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
              : "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700"
          }
        >
          {isEntry ? (
            <ArrowUpCircle className="size-5" />
          ) : (
            <ArrowDownCircle className="size-5" />
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {isEntry ? "Registrar entrada" : "Registrar saída"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {isEntry
              ? "Adicione quantidade a um ingrediente já cadastrado."
              : "Retire quantidade de um ingrediente disponível no estoque."}
          </p>
        </div>
      </div>

      {ingredients.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          Cadastre pelo menos um ingrediente antes de registrar movimentações.
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Ingrediente
              </label>

              <select
                {...register("ingredienteId", { valueAsNumber: true })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.nome} — {ingredient.compartimentoCodigo}
                  </option>
                ))}
              </select>

              {errors.ingredienteId && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.ingredienteId.message}
                </p>
              )}
            </div>

            {selectedIngredient && (
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="text-sm font-semibold text-slate-950">
                    {selectedIngredient.nome}
                  </strong>
                  <IngredientTypeBadge type={selectedIngredient.tipo} />
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  Disponível atualmente:{" "}
                  <strong>
                    {formatQuantity(
                      selectedIngredient.quantidade,
                      selectedIngredient.tipo,
                    )}
                  </strong>
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Compartimento: {selectedIngredient.compartimentoCodigo}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700">
                Quantidade
              </label>

              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="Informe a quantidade"
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
                Responsável
              </label>

              <input
                type="text"
                placeholder="Ex: Maria"
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
            disabled={isPending}
            className={
              isEntry
                ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            }
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isEntry ? "Registrar entrada" : "Registrar saída"}
          </button>
        </>
      )}
    </form>
  );
}