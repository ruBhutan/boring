import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist';
  avatar?: string;
}

interface DashboardHeaderProps {
  user: User;
  onMenuClick: () => void;
  onRoleChange: (role: User['role']) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onMenuClick, onRoleChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New booking received', time: '2 min ago' },
    { id: 2, message: 'Itinerary updated', time: '1 hour ago' },
    { id: 3, message: 'Payment processed', time: '3 hours ago' }
  ]);

  const getRoleDisplayName = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'tour-manager': return 'Tour Manager';
      case 'guide': return 'Tour Guide';
      case 'driver': return 'Driver';
      case 'tourist': return 'Tourist';
      default: return 'User';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dashboardUser');
    window.location.href = '/';
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={onMenuClick}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Page title and breadcrumb */}
        <div className="flex-1 flex items-center lg:ml-0 ml-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
          <span className="ml-2 text-sm text-gray-500">
            / {getRoleDisplayName(user.role)}
          </span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick actions based on role */}
          <div className="hidden md:flex items-center space-x-2">
            {user.role === 'tourist' && (
              <Link
                to="/tours"
                className="btn-blue-outline text-sm px-4 py-2"
              >
                Browse Tours
              </Link>
            )}
            {(user.role === 'tour-manager' || user.role === 'admin') && (
              <Link
                to="/dashboard/bookings"
                className="btn-blue-outline text-sm px-4 py-2"
              >
                New Bookings
              </Link>
            )}
            {user.role === 'guide' && (
              <Link
                to="/dashboard/my-itineraries"
                className="btn-blue-outline text-sm px-4 py-2"
              >
                Today's Tours
              </Link>
            )}
            {user.role === 'driver' && (
              <Link
                to="/dashboard/schedule"
                className="btn-blue-outline text-sm px-4 py-2"
              >
                Today's Route
              </Link>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </button>

            {/* User menu dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getRoleDisplayName(user.role)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/dashboard/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-400" />
                  Profile Settings
                </Link>

                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <CogIcon className="w-4 h-4 mr-3 text-gray-400" />
                  Dashboard Settings
                </Link>

                <hr className="my-2 border-gray-200" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors text-left"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-400" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile quick actions */}
      {(user.role !== 'tourist') && (
        <div className="md:hidden border-t border-gray-200 px-4 py-2">
          <div className="flex space-x-2">
            {user.role === 'tour-manager' || user.role === 'admin' ? (
              <Link
                to="/dashboard/bookings"
                className="btn-blue text-xs px-3 py-1.5 flex-1 text-center"
              >
                New Bookings
              </Link>
            ) : user.role === 'guide' ? (
              <Link
                to="/dashboard/my-itineraries"
                className="btn-blue text-xs px-3 py-1.5 flex-1 text-center"
              >
                Today's Tours
              </Link>
            ) : user.role === 'driver' ? (
              <Link
                to="/dashboard/schedule"
                className="btn-blue text-xs px-3 py-1.5 flex-1 text-center"
              >
                Today's Route
              </Link>
            ) : null}
          </div>
        </div>
      )}

      {/* Close user menu when clicking outside */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default DashboardHeader;
