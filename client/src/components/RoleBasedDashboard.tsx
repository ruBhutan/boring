import React from 'react';
import { useAuth } from './AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import GuideDashboard from './dashboards/GuideDashboard';
import DriverDashboard from './dashboards/DriverDashboard';
import TouristDashboard from './dashboards/TouristDashboard';

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'guide':
      return <GuideDashboard />;
    case 'driver':
      return <DriverDashboard />;
    case 'tourist':
      return <TouristDashboard />;
    default:
      return <div>Invalid role</div>;
  }
};

export default RoleBasedDashboard;