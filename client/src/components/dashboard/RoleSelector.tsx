import React from 'react';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  MapIcon,
  TruckIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface RoleSelectorProps {
  currentRole: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist';
  onRoleChange: (role: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, onRoleChange }) => {
  const roles = [
    {
      id: 'admin' as const,
      name: 'Administrator',
      description: 'Full system control and user management',
      icon: ShieldCheckIcon,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700'
    },
    {
      id: 'tour-manager' as const,
      name: 'Tour Manager',
      description: 'Manage packages, bookings, and tourist communications',
      icon: UserGroupIcon,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'guide' as const,
      name: 'Tour Guide',
      description: 'View itineraries and manage tourist interactions',
      icon: MapIcon,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    },
    {
      id: 'driver' as const,
      name: 'Driver',
      description: 'Manage routes, schedules, and passenger details',
      icon: TruckIcon,
      color: 'bg-orange-700',
      hoverColor: 'hover:bg-orange-800'
    },
    {
      id: 'tourist' as const,
      name: 'Tourist',
      description: 'Browse packages, book tours, and manage travel plans',
      icon: UserIcon,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    }
  ];

  return (
    <div className="modern-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Role Selector</h3>
        <p className="text-sm text-gray-600">
          Switch between different user roles to explore various dashboard features and permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isActive
                  ? `${role.color} text-white border-transparent shadow-lg transform scale-105`
                  : `bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md transform hover:scale-102`
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${
                  isActive ? 'text-white' : 'text-gray-900'
                }`}>
                  {role.name}
                </h4>
                <p className={`text-xs leading-tight ${
                  isActive ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {role.description}
                </p>
                {isActive && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      Active
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">Demo Mode</p>
            <p className="text-xs text-blue-700 mt-1">
              This role selector is for demonstration purposes. In a real application, user roles would be determined by authentication and permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
