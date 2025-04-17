import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Sample genres - you would get these from your API
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Documentary'];

  useEffect(() => {
    // In a real app, you would fetch from your backend/API
    const fetchMovies = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          const mockMovies = [
            {
              id: 1,
              title: "The Last Adventure",
              year: 2023,
              rating: 4.5,
              duration: "2h 15m",
              genre: ["Action", "Adventure"],
              thumbnail: "https://via.placeholder.com/300x450?text=The+Last+Adventure",
              description: "A thrilling journey through uncharted territories."
            },
            {
              id: 2,
              title: "Midnight in Paris",
              year: 2022,
              rating: 4.2,
              duration: "1h 48m",
              genre: ["Comedy", "Drama"],
              thumbnail: "https://via.placeholder.com/300x450?text=Midnight+in+Paris",
              description: "A romantic comedy about time travel and love."
            },
            // Add more mock movies...
          ];
          setMovies(mockMovies);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/30 border border-red-500 rounded-md p-4 text-center">
      <p className="text-red-400">Error loading movies: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Browse Movies</h1>
        
        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2 text-gray-300">
              Search Movies
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Search by title..."
            />
          </div>
          
          <div>
            <label htmlFor="genre" className="block text-sm font-medium mb-2 text-gray-300">
              Filter by Genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No movies found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-green-900/20">
        <div className="relative">
          <img 
            src={movie.thumbnail} 
            alt={movie.title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            {movie.rating} ★
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Movies;