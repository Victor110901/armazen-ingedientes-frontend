import { PackageCheck } from "lucide-react";
import { appConfig } from "../../config/app.config";

export function Topbar() {

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
      </div>
    </header>
  );
}