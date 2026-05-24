import { useState } from "react";
import type { SaleAvailabilityFormData, StorageAvailabilityFormData } from "../hooks/compartments/compartment.schema";
import type { TipoIngrediente } from "../types/ingredient.type";
import { useAvailableCompartmentsForSaleQuery, useAvailableCompartmentsQuery } from "../hooks/compartments/useCompartments";
import { StorageAvailabilityForm } from "../hooks/compartments/StorageAvailabilityForm";
import { SaleAvailabilityForm } from "../hooks/compartments/SaleAvailabilityForm";
import { CompartmentsResultGrid } from "../hooks/compartments/CompartmentsResultGrid";

export function CompartmentsPage() {
  const [storageParams, setStorageParams] =
    useState<StorageAvailabilityFormData>({
      tipo: "SECO",
      quantidade: 100,
    });

  const [saleType, setSaleType] = useState<TipoIngrediente>("SECO");

  const storageQuery = useAvailableCompartmentsQuery(storageParams);
  const saleQuery = useAvailableCompartmentsForSaleQuery(saleType);

  function handleStorageSubmit(data: StorageAvailabilityFormData) {
    setStorageParams(data);
  }

  function handleSaleSubmit(data: SaleAvailabilityFormData) {
    setSaleType(data.tipo);
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Compartimentos
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Disponibilidade dos compartimentos
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Consulte espaços disponíveis para armazenamento e compartimentos com
            estoque disponível para retirada, respeitando as regras de tipo e
            capacidade.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <StorageAvailabilityForm
          onSubmit={handleStorageSubmit}
          isLoading={storageQuery.isFetching}
        />

        <SaleAvailabilityForm
          onSubmit={handleSaleSubmit}
          isLoading={saleQuery.isFetching}
        />
      </div>

      <CompartmentsResultGrid
        title="Resultado para armazenamento"
        description="Compartimentos compatíveis com o tipo e quantidade informados."
        compartments={storageQuery.data ?? []}
        isLoading={storageQuery.isLoading}
        isError={storageQuery.isError}
      />

      <CompartmentsResultGrid
        title="Resultado para venda/retirada"
        description="Compartimentos com estoque disponível para o tipo selecionado."
        compartments={saleQuery.data ?? []}
        isLoading={saleQuery.isLoading}
        isError={saleQuery.isError}
      />
    </section>
  );
}