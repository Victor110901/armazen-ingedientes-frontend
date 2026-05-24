import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Não foi possível carregar os dados",
  message = "Verifique a conexão com a API e tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
        <AlertTriangle className="size-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-red-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-red-700">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <RefreshCw className="size-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}