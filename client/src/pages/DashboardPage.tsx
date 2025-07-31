import React from 'react';
import RoleBasedDashboard from '../components/RoleBasedDashboard';
import { useAuth } from '../components/AuthContext';
import { useLocation } from 'wouter';

const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  return <RoleBasedDashboard />;
};

export default DashboardPage;