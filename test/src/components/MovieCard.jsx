import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart, Star } from 'lucide-react';
import { movieService } from '../services/movieService';
import VideoPlayer from './VideoPlayer';

const MovieCard = ({ movie, onFavoriteToggle }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const posterPath = movie.poster_path 
    ? `${imageBaseUrl}/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const handlePlayVideo = async () => {
    try {
      setIsLoading(true);
      const videos = await movieService.getMovieVideos(movie.id);
      const trailer = videos.results.find(video => video.type === 'Trailer');
      if (trailer) {
        setVideoKey(trailer.key);
        setShowVideo(true);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800">
          <img
            src={posterPath}
            alt={movie.title || movie.name}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay with controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => onFavoriteToggle(movie)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <Heart
                  size={20}
                  className={movie.isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}
                />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                disabled={isLoading}
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play size={24} className="text-white" />
                )}
              </button>
            </div>

            <div className="absolute bottom-0 p-4 w-full">
              <Link to={`/movie/${movie.id}`}>
                <h3 className="text-lg font-semibold text-white truncate">
                  {movie.title || movie.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-300">
                    {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                  </p>
                  {movie.vote_average && (
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400" />
                      <span className="text-white ml-1">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {showVideo && (
        <VideoPlayer
          videoKey={videoKey}
          onClose={() => setShowVideo(false)}
        />
      )}
    </>
  );
};

export default MovieCard; 