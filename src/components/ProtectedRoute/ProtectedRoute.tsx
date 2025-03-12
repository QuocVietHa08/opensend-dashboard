import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ONBOARDING_STATUS, VIEW_TYPE } from '../../store/services/authApi';
import {
  selectIsAuthenticated,
  selectOnboardingStatus,
  selectViewType,
} from '../../store/slices/authSlice';

export function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const viewType = useSelector(selectViewType);
  const onboardingStatus = useSelector(selectOnboardingStatus);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // Handle routing based on user role and path
  if (viewType === VIEW_TYPE.ADMIN) {
    // Admin users should be on the admin page
    if (location.pathname !== '/admin' && !location.pathname.startsWith('/admin/')) {
      return <Navigate to="/admin" replace />;
    }
  } else if (viewType === VIEW_TYPE.CLIENT) {
    // Client users routing depends on onboarding status
    if (onboardingStatus !== ONBOARDING_STATUS.DONE) {
      // If onboarding is not complete, user should be on onboarding page
      if (location.pathname !== '/onboard' && !location.pathname.startsWith('/onboard/')) {
        return <Navigate to="/onboard" replace />;
      }
    } else if (location.pathname === '/onboard' || location.pathname.startsWith('/onboard/')) {
      // If onboarding is complete, user should be on dashboard
      // Only redirect if they're trying to access onboarding
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}

// Specific route component for admin routes
export function AdminRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const viewType = useSelector(selectViewType);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (viewType !== VIEW_TYPE.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// Specific route component for client routes
export function ClientRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const viewType = useSelector(selectViewType);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (viewType !== VIEW_TYPE.CLIENT) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
