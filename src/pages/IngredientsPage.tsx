import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHeader } from "../components/common/PageHeader";
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
        onRetry={() => {
          void ingredientsQuery.refetch();
        }}
      />
    );
  }

  const ingredients = ingredientsQuery.data ?? [];

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Ingredientes"
        title="Gestão de ingredientes"
        description="Cadastre, consulte e acompanhe os ingredientes armazenados nos compartimentos do armazém."
        action={
          <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {ingredients.length} ingrediente(s)
          </div>
        }
      />

      <IngredientsSummary ingredients={ingredients} />

      <div className="grid gap-6 2xl:grid-cols-[0.8fr_1.2fr]">
        <IngredientForm />

        <IngredientsTable ingredients={ingredients} />
      </div>

      <MovementsPanel ingredients={ingredients} />
    </section>
  );
}