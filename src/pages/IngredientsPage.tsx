import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { IngredientForm } from "../hooks/ingredients/IngredientForm";
import { IngredientsSummary } from "../hooks/ingredients/IngredientsSummary";
import { IngredientsTable } from "../hooks/ingredients/IngredientsTable";
import { useIngredientsQuery } from "../hooks/ingredients/useIngredients";
import { MovementsPanel } from "../hooks/moviments/MovementsPanel";

export function IngredientsPage() {
  const ingredientsQuery = useIngredientsQuery();

  if (ingredientsQuery.isLoading) {
    return <LoadingState message="Carregando ingredientes..." />;
  }

  if (ingredientsQuery.isError) {
    return (
      <ErrorState
        title="Não foi possível carregar os ingredientes"
        message="Verifique se a API está disponível e tente novamente."
      />
    );
  }

  const ingredients = ingredientsQuery.data ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Ingredientes
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Gestão de ingredientes
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Cadastre, consulte e acompanhe os ingredientes armazenados nos
            compartimentos do armazém.
          </p>
        </div>

        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {ingredients.length} ingrediente(s)
        </div>
      </div>

      <IngredientsSummary ingredients={ingredients} />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <IngredientForm />

        <IngredientsTable ingredients={ingredients} />
      </div>

      <MovementsPanel ingredients={ingredients} />
    </section>
  );
}