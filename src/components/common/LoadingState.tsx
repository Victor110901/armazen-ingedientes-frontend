interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Carregando dados..." }: LoadingStateProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

      <p className="mt-4 text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}