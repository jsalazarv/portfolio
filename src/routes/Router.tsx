import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/common/layouts/AdminLayout";
import { HomeLayout } from "@/common/layouts/HomeLayout";
import { WebsiteLayout } from "@/common/layouts/WebsiteLayout";
import { AdminBlog } from "@/modules/admin/Blog";
import { CreatePost } from "@/modules/admin/Blog/CreatePost";
import { EditPost } from "@/modules/admin/Blog/EditPost";
import { Dashboard } from "@/modules/admin/Dashboard";
import { SignIn } from "@/modules/website/auth/SignIn";
import { SignUp } from "@/modules/website/auth/SignUp";
import { Blog } from "@/modules/website/Blog";
import { BlogPost } from "@/modules/website/Blog/BlogPost";
import { NotFound } from "@/modules/website/errors/NotFound";
import { ServerError } from "@/modules/website/errors/ServerError";
import { Home } from "@/modules/website/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ServerError />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <WebsiteLayout />,
    errorElement: <ServerError />,
    children: [
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <BlogPost />,
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
        path: "/dashboard/blog",
        element: <AdminBlog />,
      },
      {
        path: "/dashboard/blog/new",
        element: <CreatePost />,
      },
      {
        path: "/dashboard/blog/edit/:id",
        element: <EditPost />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
