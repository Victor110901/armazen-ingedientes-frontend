import { Boxes, ClipboardList, History, PackageCheck } from "lucide-react";
import { useIngredientsQuery, useVolumeByTypeQuery } from "../hooks/ingredients/useIngredients";
import { useHistoryQuery } from "../hooks/history/useHistory";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { MetricCard } from "../components/common/MetricCard";
import { VolumeByTypeChart } from "../hooks/dashboard/VolumeByTypeChart";
import { EmptyState } from "../components/common/EmptyState";
import { formatIngredientType, formatQuantity } from "../utils/formatters";
import { RecentMovements } from "../hooks/dashboard/RecentMovements";
import { PageHeader } from "../components/common/PageHeader";


function calculateTotalStored(
  volumes: ReturnType<typeof useVolumeByTypeQuery>["data"],
) {
  if (!volumes) {
    return 0;
  }

  return volumes.reduce((total, item) => total + item.totalQuantity, 0);
}

export function DashboardPage() {
  const ingredientsQuery = useIngredientsQuery();
  const volumeQuery = useVolumeByTypeQuery();
  const historyQuery = useHistoryQuery("date", "desc");

  const isLoading =
    ingredientsQuery.isLoading || volumeQuery.isLoading || historyQuery.isLoading;

  const isError =
    ingredientsQuery.isError || volumeQuery.isError || historyQuery.isError;

  if (isLoading) {
    return <LoadingState message="Carregando dashboard do armazém..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Não foi possível carregar o dashboard"
        message="Verifique se a API está disponível e tente novamente."
        onRetry={() => {
          void ingredientsQuery.refetch();
          void volumeQuery.refetch();
          void historyQuery.refetch();
        }}
      />
    );
  }

  const ingredients = ingredientsQuery.data ?? [];
  const volumes = volumeQuery.data ?? [];
  const history = historyQuery.data ?? [];

  const totalStored = calculateTotalStored(volumes);
  const activeCompartments = new Set(
    ingredients.map((ingredient) => ingredient.compartimentoCodigo),
  ).size;

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard do armazém"
        description="Acompanhe volumes, compartimentos e movimentações recentes do estoque."
        action={
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Dados em tempo real da API
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Ingredientes cadastrados"
          value={String(ingredients.length)}
          description="Itens registrados no estoque."
          icon={ClipboardList}
        />

        <MetricCard
          title="Compartimentos ativos"
          value={`${activeCompartments}/5`}
          description="Compartimentos com ingredientes armazenados."
          icon={Boxes}
        />

        <MetricCard
          title="Volume total"
          value={totalStored.toLocaleString("pt-BR", {
            maximumFractionDigits: 3,
          })}
          description="Soma geral dos volumes cadastrados."
          icon={PackageCheck}
        />

        <MetricCard
          title="Movimentações"
          value={String(history.length)}
          description="Entradas e saídas registradas no histórico."
          icon={History}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {volumes.length > 0 ? (
          <VolumeByTypeChart data={volumes} />
        ) : (
          <EmptyState
            title="Nenhum volume registrado"
            message="Cadastre ingredientes para visualizar o gráfico de volume por tipo."
            icon={PackageCheck}
          />
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Resumo por tipo
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Quantidade total armazenada por categoria.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {volumes.length > 0 ? (
              volumes.map((volume) => (
                <div
                  key={formatIngredientType(volume.type)}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-600">
                    {formatIngredientType(volume.type)}
                  </span>
                  <strong className="text-sm font-semibold text-slate-950">
                    {formatQuantity(volume.totalQuantity, volume.type)}
                  </strong>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Ainda não há volumes cadastrados.
              </p>
            )}
          </div>
        </div>
      </div>

      <RecentMovements movements={history} />
    </section>
  );
}