import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Calendar, Heart } from 'lucide-react';
import { movieService } from '../services/movieService';
import { useMovie } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import VideoPlayer from '../components/VideoPlayer';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useMovie();
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [movieData, recommendationsData, videosData] = await Promise.all([
          movieService.getMovieDetails(id),
          movieService.getMovieRecommendations(id),
          movieService.getMovieVideos(id)
        ]);

        setMovie(movieData);
        setRecommendations(recommendationsData.results);
        setVideos(videosData.results);
        
        // Find the best video to show (prioritize official trailers)
        const bestVideo = videosData.results.find(video => 
          video.site === 'YouTube' && 
          video.type === 'Trailer' && 
          video.official
        ) || videosData.results.find(video => 
          video.site === 'YouTube' && 
          video.type === 'Trailer'
        ) || videosData.results.find(video => 
          video.site === 'YouTube'
        );

        if (bestVideo) {
          setSelectedVideo(bestVideo);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movie data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handlePlayVideo = (video = selectedVideo) => {
    if (video && video.site === 'YouTube' && video.key) {
      setVideoKey(video.key);
      setShowVideo(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Movie not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={`${imageBaseUrl}/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {movie.title}
            </motion.h1>

            <div className="flex items-center gap-4 text-gray-300 mb-6">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1" />
                <span>{movie.release_date?.split('-')[0]}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1" />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            <p className="text-gray-300 mb-8">{movie.overview}</p>

            <div className="flex gap-4">
              {selectedVideo ? (
                <button
                  onClick={() => handlePlayVideo()}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Play size={20} />
                  Watch Trailer
                </button>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 bg-gray-600 text-gray-300 px-6 py-3 rounded-lg cursor-not-allowed"
                >
                  <Play size={20} />
                  No Trailer Available
                </button>
              )}
              <button
                onClick={() => toggleFavorite(movie)}
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Heart
                  size={20}
                  className={isFavorite(movie.id) ? 'text-red-500 fill-red-500' : ''}
                />
                {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            {/* Additional Videos Section */}
            {videos.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">More Videos</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {videos.map((video) => (
                    video.site === 'YouTube' && video.key && (
                      <button
                        key={video.id}
                        onClick={() => handlePlayVideo(video)}
                        className="flex-shrink-0 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Play size={16} className="text-blue-500" />
                          <span className="text-white text-sm">
                            {video.type} {video.official && '(Official)'}
                          </span>
                        </div>
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendations.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard
                movie={movie}
                onFavoriteToggle={toggleFavorite}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {showVideo && (
        <VideoPlayer
          videoKey={videoKey}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails; 