import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <strong className="mt-3 block text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </strong>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon className="size-6" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
    </article>
  );
}