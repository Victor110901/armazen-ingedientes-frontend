import { Link } from "react-router-dom";
import { appRoutes } from "../config/routes.config";


export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          A rota acessada não existe ou foi movida.
        </p>

        <Link
          to={appRoutes.dashboard}
          className="mt-6 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Voltar para o dashboard
        </Link>
      </section>
    </main>
  );
}