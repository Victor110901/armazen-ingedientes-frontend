import { Boxes } from "lucide-react";
import type { CompartimentoDisponivelResponse } from "../../types/compartment.types";
import { LoadingState } from "../../components/common/LoadingState";
import { ErrorState } from "../../components/common/ErrorState";
import { EmptyState } from "../../components/common/EmptyState";
import { CompartmentCard } from "./CompartmentCard";

interface CompartmentsResultGridProps {
  title: string;
  description: string;
  compartments: CompartimentoDisponivelResponse[];
  isLoading: boolean;
  isError: boolean;
}

export function CompartmentsResultGrid({
  title,
  description,
  compartments,
  isLoading,
  isError,
}: CompartmentsResultGridProps) {
  if (isLoading) {
    return <LoadingState message="Consultando compartimentos..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Não foi possível consultar os compartimentos"
        message="Verifique a conexão com a API e tente novamente."
      />
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {compartments.length === 0 ? (
        <EmptyState
          title="Nenhum compartimento encontrado"
          message="Ajuste os filtros da consulta ou verifique o estoque atual."
          icon={Boxes}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {compartments.map((compartment) => (
            <CompartmentCard
              key={compartment.id}
              compartment={compartment}
            />
          ))}
        </div>
      )}
    </section>
  );
}