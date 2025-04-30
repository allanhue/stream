import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  Star, Tv, Download, Clock } from 'lucide-react';

const Home = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { title: "Action", image: "/api/placeholder/400/225" },
    { title: "Comedy", image: "/api/placeholder/400/225" },
    { title: "Drama", image: "/api/placeholder/400/225" },
    { title: "Sci-Fi", image: "/api/placeholder/400/225" }
  ];

  const featuredContent = [
    { title: "Cosmic Odyssey", description: "An epic journey through space and time", image: "/api/placeholder/600/350" },
    { title: "Urban Tales", description: "Stories from the heart of the city", image: "/api/placeholder/600/350" },
    { title: "Mystery Island", description: "Uncover the secrets of a forgotten place", image: "/api/placeholder/600/350" }
  ];

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const url = 'https://api.themoviedb.org/3/account/21954447/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc'
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        
        const transformedWatchlist = data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          vote_average: movie.vote_average,
          release_date: movie.release_date
        }));

        setWatchlist(transformedWatchlist);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
        setError('Failed to fetch watchlist');
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const renderWatchlist = () => (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold border-l-4 border-green-500 pl-4">My Watchlist</h2>
        <Link 
          to="/movies" 
          className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
        >
          View All <Clock className="w-4 h-4" />
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map(movie => (
            <div 
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300"
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
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
        <div className="text-center py-12">
          <p className="text-gray-400">Your watchlist is empty</p>
          <Link 
            to="/movies" 
            className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
// Trial Button Component
const TrialButton = () => (
    <Link to="/trial" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
      Start Free Trial
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Unlimited Movies,
              </span>
              <br />
              TV Shows & More
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Watch anywhere. Cancel anytime. Ready to watch? Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrialButton />
 
            </div>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredContent.map((item, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded overflow-hidden hover:shadow-lg hover:shadow-green-900/20 transition-shadow duration-300">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-300">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watchlist Section */}
      {renderWatchlist()}

      {/* Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <div className="absolute inset-0 bg-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="absolute bottom-4 left-4 z-20 text-lg font-bold group-hover:text-green-400 transition-colors duration-300">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-12 text-center">
            Why Choose LanPrime?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-4">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Watch Anywhere</h3>
              <p className="text-gray-400">Stream on your phone, tablet, laptop, and TV without paying more.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Download & Go</h3>
              <p className="text-gray-400">Download your shows  watch offline</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Commitments</h3>
              <p className="text-gray-400">Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;