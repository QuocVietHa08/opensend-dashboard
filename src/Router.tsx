import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { AdminRoute, ClientRoute } from './components/ProtectedRoute/ProtectedRoute';
import { AdminPage } from './pages/Admin.page';
import { AuthPage } from './pages/Auth.page';
import { DashboardPage } from './pages/Dashboard.page';
import { OnboardPage } from './pages/Onboard.page';
import { NotFoundPage } from './pages/NotFound.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/admin',
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ClientRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/onboard',
            element: <OnboardPage />,
          },
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  // 404 Page for any other routes
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
