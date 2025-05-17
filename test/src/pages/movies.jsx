import React, { useState, useEffect } from 'react';
import { Spinner } from '@components/Spinner';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const url = `${import.meta.env.VITE_API_URL}/api/movies`;
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                
                // Transform the movie data to match your component's needs
                const transformedMovies = data.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    genres: movie.genre_ids
                }));

                setMovies(transformedMovies);
                setError(null);
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchGenres = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/genres`;
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }

                const data = await response.json();
                setGenres(data);
            } catch (err) {
                console.error('Failed to fetch genres:', err);
            }
        };

        fetchMovies();
        fetchGenres();
    }, []);

    const handleSearch = (e) => {
        setIsSearching(true);
        setSearchTerm(e.target.value);
        // Add a small delay to prevent too many re-renders
        setTimeout(() => setIsSearching(false), 300);
    };

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = !selectedGenre || movie.genres.includes(parseInt(selectedGenre));
        return matchesSearch && matchesGenre;
    });

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-950 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-8">
                    Popular Movies
                </h1>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {isSearching && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Spinner size="sm" />
                            </div>
                        )}
                    </div>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map(movie => (
                        <div
                            key={movie.id}
                            className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                        >
                            <div className="relative h-64">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                                        e.target.onerror = null; // Prevent infinite loop
                                    }}
                                />
                                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                                    {movie.vote_average.toFixed(1)} ★
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {movie.overview}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">
                                        {new Date(movie.release_date).getFullYear()}
                                    </span>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        onClick={() => {/* Add to watchlist or play movie */}}
                                    >
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMovies.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        No movies found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movies;