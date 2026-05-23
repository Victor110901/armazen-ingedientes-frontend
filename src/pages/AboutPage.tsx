import { appConfig } from "../config/app.config";

export function AboutPage() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Sobre
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {appConfig.name}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Sistema web desenvolvido para consumir uma API Spring Boot de gerenciamento
          de ingredientes, compartimentos, movimentações e histórico de estoque.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">API configurada</h2>
        <p className="mt-2 break-all rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
          {appConfig.apiUrl}
        </p>
      </div>
    </section>
  );
}