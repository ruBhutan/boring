import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not authorized - redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized
  return children ? <>{children}</> : <Outlet />;
};

export default RoleProtectedRoute;
