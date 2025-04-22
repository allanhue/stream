import React, { useState, useEffect } from 'react';
import { Spinner } from '../components/Spinner';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc'
                    }
                };

                const response = await fetch(url, options);
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

        fetchMovies();
    }, []);

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
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
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
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{movie.overview.substring(0, 100)}...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-yellow-400">
                                        {movie.vote_average.toFixed(1)} ★
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {new Date(movie.release_date).getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movies;