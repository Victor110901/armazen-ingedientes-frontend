import { Boxes, CalendarDays, PackageCheck } from "lucide-react";
import type { CompartimentoDisponivelResponse } from "../../types/compartment.types";
import { IngredientTypeBadge } from "../../components/common/IngredientTypeBadge";
import {
  formatDate,
  formatQuantitiesInText,
  formatQuantity,
} from "../../utils/formatters";

interface CompartmentCardProps {
  compartment: CompartimentoDisponivelResponse;
}

export function CompartmentCard({ compartment }: CompartmentCardProps) {
  const typeForQuantity =
    compartment.tipoAtual ?? compartment.ultimoTipoArmazenado ?? "SECO";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Compartimento</p>
          <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            {compartment.codigo}
          </h3>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Boxes className="size-6" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {compartment.tipoAtual ? (
          <IngredientTypeBadge type={compartment.tipoAtual} />
        ) : (
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            Vazio
          </span>
        )}

        {compartment.disponivel && (
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Disponível
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="flex items-center gap-2 text-slate-500">
            <PackageCheck className="size-4" />
            Atual
          </span>
          <strong className="text-slate-950">
            {formatQuantity(compartment.quantidadeAtual, typeForQuantity)}
          </strong>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="text-slate-500">Capacidade</span>
          <strong className="text-slate-950">
            {formatQuantity(compartment.capacidadeMaxima, typeForQuantity)}
          </strong>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="text-slate-500">Espaço livre</span>
          <strong className="text-slate-950">
            {formatQuantity(compartment.espacoDisponivel, typeForQuantity)}
          </strong>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="size-4" />
            Última data
          </span>
          <strong className="text-slate-950">
            {formatDate(compartment.ultimaDataArmazenamento)}
          </strong>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-500">
        {formatQuantitiesInText(compartment.motivo)}
      </p>
    </article>
  );
}
