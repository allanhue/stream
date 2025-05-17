import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Clock, 
  Star, 
  History, 
  Download, 
  Heart, 
  Settings,
  Edit2,
  Camera
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 bg-${color}-500/10 rounded-lg`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    joinDate: 'January 2024',
    watchTime: '156 hours',
    favoriteGenres: ['Action', 'Sci-Fi', 'Drama'],
    watchlist: 42,
    completed: 156,
    downloads: 28,
    favorites: 89
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save the profile changes to your backend
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                <Camera size={20} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-gray-400 mb-4">{profile.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {profile.favoriteGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit2 size={20} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Clock}
            title="Watch Time"
            value={profile.watchTime}
            color="blue"
          />
          <StatCard
            icon={Star}
            title="Watchlist"
            value={profile.watchlist}
            color="yellow"
          />
          <StatCard
            icon={History}
            title="Completed"
            value={profile.completed}
            color="green"
          />
          <StatCard
            icon={Download}
            title="Downloads"
            value={profile.downloads}
            color="purple"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={`https://picsum.photos/200/200?random=${item}`}
                    alt="Activity"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Movie Title {item}</h3>
                  <p className="text-sm text-gray-400">Watched 2 hours ago</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;