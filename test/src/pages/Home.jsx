import React, { useState, useEffect } from 'react';
import { Star, Tv, Play, Heart, Clock, ChevronRight } from 'lucide-react';

// Show card component with vertical design instead of circular
const ShowCard = ({ show, index }) => (
  <div 
    className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group"
    style={{ 
      animationDelay: `${index * 100}ms`,
      opacity: 0,
      animation: 'fadeIn 0.5s ease forwards'
    }}
  >
    <div className="relative aspect-[2/3]">
      <img
        src={show.image}
        alt={show.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md text-sm flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500" />
        <span>{show.rating}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-white truncate">{show.title}</h3>
      <p className="text-sm text-gray-400">{show.genre}</p>
    </div>
  </div>
);

// Featured show banner with improved layout
const FeaturedShowBanner = ({ show }) => (
  <div 
    className="relative rounded-xl overflow-hidden h-96 group"
    style={{ 
      opacity: 0,
      animation: 'fadeIn 0.8s ease forwards'
    }}
  >
    <img
      src={show.image}
      alt={show.title}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">NEW</span>
          <span className="text-gray-300 text-sm">2025</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{show.title}</h3>
        <p className="text-gray-300 mb-4 max-w-2xl">{show.description}</p>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Play className="w-5 h-5" />
            Watch Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700/80 transition-colors">
            <Heart className="w-5 h-5" />
            Add to List
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Section title component with view all option
const SectionTitle = ({ title, viewAllLink }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">{title}</h2>
    {viewAllLink && (
      <a 
        href={viewAllLink} 
        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
      >
        View All <ChevronRight className="w-4 h-4" />
      </a>
    )}
  </div>
);

// Main HomePage component
const Home = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for trending shows
  const trendingShows = [
    { title: "Cosmic Odyssey", image: "/api/placeholder/300/450", genre: "Sci-Fi", rating: 4.8 },
    { title: "Urban Tales", image: "/api/placeholder/300/450", genre: "Drama", rating: 4.5 },
    { title: "Mystery Island", image: "/api/placeholder/300/450", genre: "Mystery", rating: 4.7 },
    { title: "Future World", image: "/api/placeholder/300/450", genre: "Sci-Fi", rating: 4.6 },
    { title: "Lost City", image: "/api/placeholder/300/450", genre: "Adventure", rating: 4.9 },
    { title: "Neon Dreams", image: "/api/placeholder/300/450", genre: "Cyberpunk", rating: 4.3 }
  ];

  // Categories with shows
  const categories = [
    {
      name: "Continue Watching",
      shows: [
        { title: "Dark Matter", image: "/api/placeholder/300/450", genre: "Sci-Fi", rating: 4.7, progress: 65 },
        { title: "City Lights", image: "/api/placeholder/300/450", genre: "Drama", rating: 4.4, progress: 30 },
        { title: "Wilderness", image: "/api/placeholder/300/450", genre: "Adventure", rating: 4.8, progress: 80 },
        { title: "Silent Echo", image: "/api/placeholder/300/450", genre: "Thriller", rating: 4.6, progress: 45 }
      ]
    },
    {
      name: "Popular Shows",
      shows: [
        { title: "Quantum Break", image: "/api/placeholder/300/450", genre: "Sci-Fi", rating: 4.9 },
        { title: "Midnight Sun", image: "/api/placeholder/300/450", genre: "Drama", rating: 4.7 },
        { title: "Ocean's Edge", image: "/api/placeholder/300/450", genre: "Adventure", rating: 4.5 },
        { title: "The Heist", image: "/api/placeholder/300/450", genre: "Crime", rating: 4.8 },
        { title: "Star Nomad", image: "/api/placeholder/300/450", genre: "Sci-Fi", rating: 4.6 }
      ]
    }
  ];

  // Featured content for banner
  const featuredContent = {
    title: "Cosmic Odyssey",
    description: "An epic journey through space and time. Follow Captain Lena Hayes and her crew as they navigate the unknown regions of the galaxy, encountering alien civilizations and uncovering the mysteries of the universe.",
    image: "/api/placeholder/1200/600"
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockWatchlist = [
            { id: 1, title: "The Last Journey", poster_path: "/api/placeholder/300/450", vote_average: 8.7, release_date: "2025-03-15" },
            { id: 2, title: "Eternal Sunshine", poster_path: "/api/placeholder/300/450", vote_average: 9.1, release_date: "2024-11-22" },
            { id: 3, title: "Night City", poster_path: "/api/placeholder/300/450", vote_average: 8.5, release_date: "2025-01-08" },
            { id: 4, title: "Beyond Tomorrow", poster_path: "/api/placeholder/300/450", vote_average: 7.9, release_date: "2024-12-05" },
            { id: 5, title: "Forgotten Realms", poster_path: "/api/placeholder/300/450", vote_average: 8.3, release_date: "2025-02-19" }
          ];
          setWatchlist(mockWatchlist);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
        setError('Failed to fetch watchlist');
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Style for the custom scrolling animation
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <style>{keyframes}</style>
      
      {/* Hero Banner */}
      <div className="pb-8">
        <FeaturedShowBanner show={featuredContent} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Continue Watching Section */}
        <div className="mb-12">
          <SectionTitle title="Continue Watching" viewAllLink="/continue" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {categories[0].shows.map((show, index) => (
              <div key={index} className="relative">
                <ShowCard show={show} index={index} />
                {/* Progress bar */}
                <div className="h-1 bg-gray-700 absolute bottom-0 left-0 right-0">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${show.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="mb-12">
          <SectionTitle title="Trending Now" viewAllLink="/trending" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {trendingShows.map((show, index) => (
              <ShowCard key={index} show={show} index={index} />
            ))}
          </div>
        </div>

        {/* Popular Shows Section */}
        <div className="mb-12">
          <SectionTitle title="Popular Shows" viewAllLink="/popular" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {categories[1].shows.map((show, index) => (
              <ShowCard key={index} show={show} index={index} />
            ))}
          </div>
        </div>

        {/* My Watchlist Section */}
        <div className="mb-12">
          <SectionTitle title="My Watchlist" viewAllLink="/watchlist" />
          
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center p-4">
              {error}
            </div>
          )}

          {!loading && !error && watchlist.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {watchlist.map((movie, index) => (
                <div
                  key={movie.id}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: 'fadeIn 0.5s ease forwards'
                  }}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="relative aspect-[2/3]">
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/300/450';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && watchlist.length === 0 && (
            <div className="text-center py-12 bg-gray-900/50 rounded-xl">
              <div className="mb-4">
                <Clock className="w-12 h-12 text-gray-500 mx-auto" />
              </div>
              <p className="text-gray-400 mb-4">Your watchlist is empty</p>
              <a 
                href="/movies" 
                className="inline-block mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse Movies
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;