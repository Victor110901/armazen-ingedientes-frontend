import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AboutPage } from "../pages/AboutPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HistoryPage } from "../pages/HistoryPage";
import { IngredientsPage } from "../pages/IngredientsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { appRoutes } from "../config/routes.config";
import { CompartmentsPage } from "../pages/CompartmentsPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: appRoutes.dashboard,
        element: <DashboardPage />,
      },
      {
        path: appRoutes.ingredients,
        element: <IngredientsPage />,
      },
      {
        path: appRoutes.compartments,
        element: <CompartmentsPage />,
      },
      {
        path: appRoutes.history,
        element: <HistoryPage />,
      },
      {
        path: appRoutes.about,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}