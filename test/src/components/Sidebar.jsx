import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Film, 
  List, 
  Info, 
  Mail, 
  LogOut,
  User
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl font-bold">S</span>
          </div>
          <h1 className="text-xl font-bold">StreamVibe</h1>
        </div>

        {user && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div>
                <p className="font-medium">{user.displayName}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Film size={20} />
            <span>Movies</span>
          </Link>

          <Link
            to="/categories"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <List size={20} />
            <span>Categories</span>
          </Link>

          <Link
            to="/about"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Info size={20} />
            <span>About</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Mail size={20} />
            <span>Contact</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-red-400"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 