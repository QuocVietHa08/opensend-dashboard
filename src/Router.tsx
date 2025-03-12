import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth.page';
import { AdminPage } from './pages/Admin.page';
import { DashboardPage } from './pages/Dashboard.page';
import { OnboardPage } from './pages/Onboard.page';
import { 
  AdminRoute, 
  ClientRoute 
} from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  // Admin routes
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />,
      },
    ],
  },
  // Client routes with onboarding check
  {
    element: <ClientRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/onboard',
        element: <OnboardPage />,
      },
    ],
  },
  // Fallback for any other routes
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
