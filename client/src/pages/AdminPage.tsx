import React, { useEffect } from 'react';
import RoleBasedDashboard from '../components/RoleBasedDashboard';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (!isLoading && user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <RoleBasedDashboard />;
};

export default AdminPage;