import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Spinner } from '../components/Spinner';
import { MovieCard } from '../components/MovieCard';

export const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [moviesData, genresData] = await Promise.all([
                    api.getMovies(),
                    api.getGenres()
                ]);
                setMovies(moviesData);
                setGenres(genresData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = !selectedGenre || (movie.genres && movie.genres.includes(selectedGenre));
        return matchesSearch && matchesGenre;
    });

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="p-2 border rounded-lg flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border rounded-lg"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};