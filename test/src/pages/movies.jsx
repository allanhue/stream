import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Spinner } from '../components/Spinner';

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const data = await api.getMovies();
            setMovies(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'all' || movie.genres?.some(genre => genre.id === parseInt(selectedGenre));
        return matchesSearch && matchesGenre;
    });

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between mb-8">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="p-2 border rounded mb-4 md:mb-0 md:mr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border rounded"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="all">All Genres</option>
                    {/* Add genre options dynamically */}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Release Date: {new Date(movie.release_date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 line-clamp-3">{movie.overview}</p>
                            <div className="mt-4">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    Rating: {movie.vote_average}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};