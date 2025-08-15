import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  MapIcon,
  TruckIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  CreditCardIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tour-manager' | 'guide' | 'driver' | 'tourist';
  avatar?: string;
}

interface DashboardSidebarProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user, isOpen, onClose }) => {
  const location = useLocation();

  const getNavigationItems = (role: User['role']) => {
    const baseItems = [
      { name: 'Overview', href: '/dashboard', icon: HomeIcon }
    ];

    switch (role) {
      case 'admin':
        return [
          ...baseItems,
          { name: 'User Management', href: '/dashboard/users', icon: UserGroupIcon },
          { name: 'Site Settings', href: '/dashboard/settings', icon: CogIcon },
          { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
          { name: 'Content Management', href: '/dashboard/content', icon: DocumentTextIcon },
          { name: 'Tour Operations', href: '/dashboard/tours', icon: MapIcon },
          { name: 'Hotel Management', href: '/dashboard/hotels', icon: BuildingOfficeIcon },
          { name: 'Bookings', href: '/dashboard/bookings', icon: ClipboardDocumentListIcon },
          { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon }
        ];

      case 'tour-manager':
        return [
          ...baseItems,
          { name: 'Tour Packages', href: '/dashboard/packages', icon: MapIcon },
          { name: 'Itinerary Management', href: '/dashboard/itineraries', icon: ClipboardDocumentListIcon },
          { name: 'Bookings', href: '/dashboard/bookings', icon: CreditCardIcon },
          { name: 'Pricing & Offers', href: '/dashboard/pricing', icon: ChartBarIcon },
          { name: 'Tourist Communications', href: '/dashboard/communications', icon: ChatBubbleLeftIcon },
          { name: 'Content Updates', href: '/dashboard/content', icon: DocumentTextIcon },
          { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon }
        ];

      case 'guide':
        return [
          ...baseItems,
          { name: 'My Itineraries', href: '/dashboard/my-itineraries', icon: ClipboardDocumentListIcon },
          { name: 'Work History', href: '/dashboard/work-history', icon: DocumentTextIcon },
          { name: 'Assigned Tasks', href: '/dashboard/tasks', icon: CalendarIcon },
          { name: 'Tourist Information', href: '/dashboard/tourists', icon: UserGroupIcon },
          { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftIcon },
          { name: 'Profile', href: '/dashboard/profile', icon: UserIcon }
        ];

      case 'driver':
        return [
          ...baseItems,
          { name: 'My Routes', href: '/dashboard/routes', icon: TruckIcon },
          { name: 'Trip Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
          { name: 'Vehicle Details', href: '/dashboard/vehicle', icon: TruckIcon },
          { name: 'Tourist Details', href: '/dashboard/passengers', icon: UserGroupIcon },
          { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftIcon },
          { name: 'Profile', href: '/dashboard/profile', icon: UserIcon }
        ];

      case 'tourist':
        return [
          ...baseItems,
          { name: 'My Bookings', href: '/dashboard/my-bookings', icon: ClipboardDocumentListIcon },
          { name: 'Itinerary Builder', href: '/dashboard/itinerary-builder', icon: MapIcon },
          { name: 'Package Orders', href: '/dashboard/orders', icon: CreditCardIcon },
          { name: 'Hotel Bookings', href: '/dashboard/hotel-bookings', icon: BuildingOfficeIcon },
          { name: 'Flight Bookings', href: '/dashboard/flight-bookings', icon: CalendarIcon },
          { name: 'Custom Packages', href: '/dashboard/custom-packages', icon: DocumentTextIcon },
          { name: 'Feedback & Reviews', href: '/dashboard/feedback', icon: StarIcon },
          { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftIcon },
          { name: 'Profile', href: '/dashboard/profile', icon: UserIcon }
        ];

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems(user.role);

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-600';
      case 'tour-manager': return 'bg-blue-600';
      case 'guide': return 'bg-green-600';
      case 'driver': return 'bg-orange-700';
      case 'tourist': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getRoleLabel = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'tour-manager': return 'Tour Manager';
      case 'guide': return 'Tour Guide';
      case 'driver': return 'Driver';
      case 'tourist': return 'Tourist';
      default: return 'User';
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white/90 backdrop-blur-md border-r border-gray-200">
          {/* Logo and brand */}
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">Bhutan Tourism</span>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white mt-1 ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'role-button text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/70 hover:text-gray-900 hover:shadow-md'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-700'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 flex ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex min-h-0 flex-1 flex-col bg-white w-64">
          {/* Mobile logo and close button */}
          <div className="flex h-16 flex-shrink-0 items-center justify-between px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3" onClick={onClose}>
              <div className="w-8 h-8 bg-blue-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <span className="text-lg font-bold gradient-text">Bhutan Tourism</span>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 -mr-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile user info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white mt-1 ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'role-button text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-700'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Overlay for closing sidebar */}
        <div className="flex-shrink-0 w-14" onClick={onClose} />
      </div>
    </>
  );
};

export default DashboardSidebar;
