import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import RoleSelector from './RoleSelector';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist';
  avatar?: string;
}

const DashboardLayout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // In a real app, this would come from authentication context
    // For demo purposes, we'll use localStorage or default to tourist
    const savedUser = localStorage.getItem('dashboardUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Default demo user
      const defaultUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'demo@bhutantourism.com',
        role: 'tourist'
      };
      setUser(defaultUser);
      localStorage.setItem('dashboardUser', JSON.stringify(defaultUser));
    }
  }, []);

  const handleRoleChange = (newRole: User['role']) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('dashboardUser', JSON.stringify(updatedUser));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-blue-gradient-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-700 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardClasses = `dashboard-${user.role}`;

  return (
    <div className={`min-h-screen ${dashboardClasses}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onRoleChange={handleRoleChange}
        />

        {/* Main content area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Role selector for demo purposes */}
            <div className="mb-6">
              <RoleSelector currentRole={user.role} onRoleChange={handleRoleChange} />
            </div>

            {/* Page content */}
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
