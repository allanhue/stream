import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, List, Mail } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/movies', icon: Film, label: 'Movies' },
    { path: '/categories', icon: List, label: 'Categories' },
    { path: '/contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-500 mb-8">LanPrime</h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 