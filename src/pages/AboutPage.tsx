import { Activity, Code2, Database, ExternalLink, Server } from "lucide-react";
import { appConfig } from "../config/app.config";

const resources = [
  {
    label: "Health check",
    path: "/health",
    icon: Activity,
  },
  {
    label: "Swagger UI",
    path: "/swagger-ui.html",
    icon: Code2,
  },
  {
    label: "OpenAPI JSON",
    path: "/v3/api-docs",
    icon: Server,
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "TanStack Query",
  "Axios",
  "React Hook Form",
  "Zod",
  "Recharts",
];

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
          Interface web desenvolvida para consumir uma API Spring Boot de
          gerenciamento de ingredientes, compartimentos, movimentações e
          histórico de estoque.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Database className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                API integrada
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                O frontend utiliza uma API REST em produção para consultar e
                movimentar dados reais do armazém.
              </p>
            </div>
          </div>

          <p className="mt-5 break-all rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {appConfig.apiUrl}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const href = `${appConfig.apiUrl}${resource.path}`;

              return (
                <a
                  key={resource.path}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <Icon className="size-5 text-blue-700" />
                  <p className="mt-3 text-sm font-semibold text-slate-950">
                    {resource.label}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                    Abrir <ExternalLink className="size-3" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Code2 className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Stack do frontend
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Projeto criado do zero com foco em organização, tipagem,
                integração real e responsividade.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}