import { PackageCheck } from "lucide-react";
import { appConfig } from "../../config/app.config";
import { cn } from "../../utils/cn";
import { useHealthCheckQuery } from "../../hooks/dashboard/useHealthCheck";


export function Topbar() {
  const { isError, isLoading } = useHealthCheckQuery();

  const statusLabel = isLoading
    ? "Verificando API"
    : isError
      ? "API indisponível"
      : "API conectada";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/85 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <PackageCheck className="size-6" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-950">{appConfig.name}</p>
            <p className="text-xs text-slate-500">Painel operacional</p>
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="text-sm font-medium text-slate-500">
            Sistema de gerenciamento de estoque
          </p>
        </div>

        <div
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold",
            isLoading &&
              "border-amber-200 bg-amber-50 text-amber-700",
            isError &&
              "border-red-200 bg-red-50 text-red-700",
            !isLoading &&
              !isError &&
              "border-emerald-200 bg-emerald-50 text-emerald-700",
          )}
        >
          <span className="flex items-center gap-2">
            <span
              className={
                isLoading
                  ? "size-2 animate-pulse rounded-full bg-amber-500"
                  : isError
                    ? "size-2 rounded-full bg-red-500"
                    : "size-2 rounded-full bg-emerald-500"
              }
            />
            {statusLabel}
          </span>
        </div>
      </div>
    </header>
  );
}