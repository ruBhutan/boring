import React, { useEffect, useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../components/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DriverDashboard from '../components/dashboard/DriverDashboard';
import GuideDashboard from '../components/dashboard/GuideDashboard';
import RoleSelector from '../components/dashboard/RoleSelector';
import TouristDashboard from '../components/dashboard/TouristDashboard';
import TourManagerDashboard from '../components/dashboard/TourManagerDashboard';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [dashboardKey, setDashboardKey] = useState(0);

  useEffect(() => {
    if (user && !selectedRole) {
      // Auto-select role based on user permissions or default to tourist
      if (user.role === 'admin') {
        setSelectedRole('admin');
      } else if (user.role === 'tour_manager') {
        setSelectedRole('tour_manager');
      } else if (user.role === 'guide') {
        setSelectedRole('guide');
      } else if (user.role === 'driver') {
        setSelectedRole('driver');
      } else {
        setSelectedRole('tourist');
      }
    }
  }, [user, selectedRole]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setDashboardKey(prev => prev + 1); // Force re-render of dashboard
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-text mb-4">Please log in to access your dashboard</h1>
          <p className="text-brand-text-muted">You need to be authenticated to view dashboard content</p>
        </div>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-background">
        <div className="max-w-md w-full mx-4">
          <div className="bg-brand-surface rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-brand-text mb-4">Select Your Dashboard Role</h1>
            <p className="text-brand-text-muted mb-6">
              Choose the dashboard that best represents your current role or interest:
            </p>
            <RoleSelector onRoleSelect={handleRoleChange} />
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'tourist':
        return <TouristDashboard key={dashboardKey} />;
      case 'tour_manager':
        return <TourManagerDashboard key={dashboardKey} />;
      case 'guide':
        return <GuideDashboard key={dashboardKey} />;
      case 'driver':
        return <DriverDashboard key={dashboardKey} />;
      case 'admin':
        return <AdminPanel key={dashboardKey} />;
      default:
        return <TouristDashboard key={dashboardKey} />;
    }
  };

  return (
    <DashboardLayout
      selectedRole={selectedRole}
      onRoleChange={handleRoleChange}
      user={user}
    >
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default DashboardPage;
