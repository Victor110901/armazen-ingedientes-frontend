import { appConfig } from "./config/app.config";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Frontend em construção
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {appConfig.name}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Interface web responsiva para gerenciamento de ingredientes,
            compartimentos, movimentações e histórico de estoque.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            <strong>API configurada:</strong> {appConfig.apiUrl}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;