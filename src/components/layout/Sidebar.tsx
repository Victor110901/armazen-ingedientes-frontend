import { NavLink } from "react-router-dom";
import { PackageCheck } from "lucide-react";
import { appConfig } from "../../config/app.config";
import { navigationItems } from "../../config/navigation.config";
import { cn } from "../../utils/cn";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-4 py-5 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 rounded-3xl bg-slate-950 px-4 py-4 text-white">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500">
          <PackageCheck className="size-6" />
        </div>

        <div>
          <p className="text-sm font-bold leading-tight">{appConfig.name}</p>
          <p className="mt-0.5 text-xs text-slate-300">Painel operacional</p>
        </div>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )
              }
            >
              <Icon className="size-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Backend
        </p>
        <p className="mt-2 break-all text-xs leading-5 text-slate-600">
          {appConfig.apiUrl}
        </p>
      </div>
    </aside>
  );
}