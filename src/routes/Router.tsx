import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/common/layouts/AdminLayout";
import { WebsiteLayout } from "@/common/layouts/WebsiteLayout";
import { Dashboard } from "@/modules/admin/Dashboard";
import { SignIn } from "@/modules/website/auth/SignIn";
import { SignUp } from "@/modules/website/auth/SignUp";
import { Home } from "@/modules/website/Home";
import { NotFound } from "@/modules/website/errors/NotFound";
import { ServerError } from "@/modules/website/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    errorElement: <ServerError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ServerError />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ServerError />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ServerError />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
