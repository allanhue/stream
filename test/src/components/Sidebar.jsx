import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Home, 
  Film, 
  Tv, 
  List, 
  Mail, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isVisible, onVisibilityChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleVisibility = () => {
    onVisibilityChange(!isVisible);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/movies', icon: Film, label: 'Movies' },
    { path: '/series', icon: Tv, label: 'Series' },
    { path: '/categories', icon: List, label: 'Categories' },
    { path: '/contact', icon: Mail, label: 'Contact' }
  ];

  const bottomNavItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { action: handleLogout, icon: LogOut, label: 'Logout' }
  ];

  const NavItem = ({ item, isCollapsed }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    if (item.action) {
      return (
        <button
          onClick={item.action}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Icon className="w-5 h-5" />
          {!isCollapsed && <span>{item.label}</span>}
        </button>
      );
    }

    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Icon className="w-5 h-5" />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ width: isCollapsed ? 80 : 256 }}
          animate={{ width: isCollapsed ? 80 : 256 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 flex flex-col z-50"
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
              >
                LanPrime
              </motion.h1>
            )}
            <div className="flex gap-2">
              <button
                onClick={toggleCollapse}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
              <button
                onClick={toggleVisibility}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-3 py-4 border-t border-gray-800 space-y-2">
            {bottomNavItems.map((item, index) => (
              <NavItem key={item.path || index} item={item} isCollapsed={isCollapsed} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 