import { createBrowserRouter } from 'react-router-dom';

import { AdminLayout } from '@/common/layouts/AdminLayout';
import { Dashboard } from '@/modules/admin/Dashboard';
import Home from '@/modules/website/Home';
import { SignIn } from '@/modules/website/auth/SignIn';
import { SignUp } from '@/modules/website/auth/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
