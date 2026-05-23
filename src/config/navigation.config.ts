import {
  Boxes,
  ClipboardList,
  History,
  Info,
  LayoutDashboard,
} from "lucide-react";
import { appRoutes } from "./routes.config";


export const navigationItems = [
  {
    label: "Dashboard",
    path: appRoutes.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Ingredientes",
    path: appRoutes.ingredients,
    icon: ClipboardList,
  },
  {
    label: "Compartimentos",
    path: appRoutes.compartments,
    icon: Boxes,
  },
  {
    label: "Histórico",
    path: appRoutes.history,
    icon: History,
  },
  {
    label: "Sobre",
    path: appRoutes.about,
    icon: Info,
  },
] as const;