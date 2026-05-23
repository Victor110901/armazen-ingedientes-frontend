export function HistoryPage() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Histórico
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Histórico de movimentações
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Acompanhe entradas, saídas, responsáveis e compartimentos movimentados.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
        Histórico será integrado com dados reais da API nas próximas etapas.
      </div>
    </section>
  );
}