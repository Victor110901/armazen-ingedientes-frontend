import { PackageSearch } from "lucide-react";
import type { IngredienteResponse } from "../../types/ingredient.type";
import { EmptyState } from "../../components/common/EmptyState";
import { IngredientTypeBadge } from "../../components/common/IngredientTypeBadge";
import { formatDateTime, formatQuantity } from "../../utils/formatters";

interface IngredientsTableProps {
  ingredients: IngredienteResponse[];
}

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  if (ingredients.length === 0) {
    return (
      <EmptyState
        title="Nenhum ingrediente cadastrado"
        message="Cadastre o primeiro ingrediente para iniciar o controle do armazém."
        icon={PackageSearch}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Ingredientes cadastrados
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Lista dos ingredientes atualmente registrados no estoque.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Ingrediente</th>
              <th className="px-6 py-4 font-semibold">Tipo</th>
              <th className="px-6 py-4 font-semibold">Quantidade</th>
              <th className="px-6 py-4 font-semibold">Compartimento</th>
              <th className="px-6 py-4 font-semibold">Responsável</th>
              <th className="px-6 py-4 font-semibold">Criado em</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {ingredients.map((ingredient) => (
              <tr
                key={ingredient.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-6 py-4">
                  <strong className="font-semibold text-slate-950">
                    {ingredient.nome}
                  </strong>
                  <p className="mt-1 text-xs text-slate-500">
                    ID #{ingredient.id}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <IngredientTypeBadge type={ingredient.tipo} />
                </td>

                <td className="px-6 py-4 font-semibold text-slate-900">
                  {formatQuantity(ingredient.quantidade, ingredient.tipo)}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {ingredient.compartimentoCodigo}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {ingredient.responsavelUltimaMovimentacao}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {formatDateTime(ingredient.criadoEm)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}