import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAdmin = false }) => {
  const { user, profile, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is not logged in, redirect to login page keeping return location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin is required and user is not admin, redirect to patient dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <Outlet />;
};
