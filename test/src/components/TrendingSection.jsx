import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { movieService } from '../services/movieService';
import MovieCard from './MovieCard';
import { useMovie } from '../contexts/MovieContext';

const TrendingSection = ({ type, title }) => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useMovie();

  const fetchContent = async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      let response;
      
      switch (type) {
        case 'movie':
          response = await movieService.getTrendingMovies(pageNum);
          break;
        case 'tv':
          response = await movieService.getTrendingTV(pageNum);
          break;
        case 'person':
          response = await movieService.getTrendingPeople(pageNum);
          break;
        default:
          throw new Error('Invalid content type');
      }

      const newContent = response.results.map(item => ({
        ...item,
        isFavorite: isFavorite(item.id)
      }));

      if (pageNum === 1) {
        setContent(newContent);
      } else {
        setContent(prev => [...prev, ...newContent]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(1);
  }, [type]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchContent(nextPage);
  };

  const handleFavoriteToggle = (item) => {
    toggleFavorite(item);
    setContent(prev =>
      prev.map(movie =>
        movie.id === item.id
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie
      )
    );
  };

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading {title}: {error}
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {content.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard
              movie={item}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </motion.div>
        ))}
      </div>

      {content.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingSection; 