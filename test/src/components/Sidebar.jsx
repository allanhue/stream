import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, List, Mail } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/movies', icon: Film, label: 'Movies' },
    { path: '/series', icon: Tv, label: 'Series' },
    { path: '/categories', icon: List, label: 'Categories' },
    { path: '/contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-8">
          LanPrime
        </h1>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
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