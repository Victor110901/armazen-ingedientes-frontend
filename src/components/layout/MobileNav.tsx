import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation.config";
import { cn } from "../../utils/cn";



export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur lg:hidden">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-medium transition",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-950",
              )
            }
          >
            <Icon className="size-5" />
            <span className="line-clamp-1">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}