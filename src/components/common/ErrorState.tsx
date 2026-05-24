import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({
  title = "Não foi possível carregar os dados",
  message = "Verifique a conexão com a API e tente novamente.",
}: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
        <AlertTriangle className="size-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-red-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-red-700">{message}</p>
    </div>
  );
}