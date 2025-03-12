import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ONBOARDING_STATUS, VIEW_TYPE } from '../../store/services/authApi';
import {
  selectIsAuthenticated,
  selectOnboardingStatus,
  selectViewType,
} from '../../store/slices/authSlice';

// export function ProtectedRoute() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   // const viewType = useSelector(selectViewType);
//   // const onboardingStatus = useSelector(selectOnboardingStatus);
//   // const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/auth" replace />;
//   }

//   // if (viewType === VIEW_TYPE.ADMIN) {
//   //   if (location.pathname !== '/admin' && !location.pathname.startsWith('/admin/')) {
//   //     return <Navigate to="/admin" replace />;
//   //   }
//   // } else if (viewType === VIEW_TYPE.CLIENT) {
//   //   if (onboardingStatus !== ONBOARDING_STATUS.DONE) {
//   //     if (location.pathname !== '/onboard' && !location.pathname.startsWith('/onboard/')) {
//   //       return <Navigate to="/onboard" replace />;
//   //     }
//   //   } else if (location.pathname === '/onboard' || location.pathname.startsWith('/onboard/')) {
//   //     return <Navigate to="/dashboard" replace />;
//   //   }
//   // }

//   return <Outlet />;
// }

// Specific route component for admin routes
export function AdminRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const viewType = useSelector(selectViewType);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // if (viewType !== VIEW_TYPE.ADMIN) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
}

// Specific route component for client routes
export function ClientRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const viewType = useSelector(selectViewType);
  // const onboardingStatus = useSelector(selectOnboardingStatus);
  // const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // if (viewType !== VIEW_TYPE.CLIENT) {
  //   return <Navigate to="/admin" replace />;
  // }

  // // Handle routing based on onboarding status
  // if (onboardingStatus !== ONBOARDING_STATUS.DONE) {
  //   if (location.pathname !== '/onboard' && !location.pathname.startsWith('/onboard/')) {
  //     return <Navigate to="/onboard" replace />;
  //   }
  // } else if (location.pathname === '/onboard' || location.pathname.startsWith('/onboard/')) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
}
