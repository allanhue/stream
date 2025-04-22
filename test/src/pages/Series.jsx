import React, { useState, useEffect } from 'react';
import { Spinner } from '../components/Spinner';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      setLoading(true);
      const data = await api.getSeries();
      setSeries(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch series. Please try again later.');
      console.error('Error fetching series:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSeries = series.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || show.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-8">
        Popular Series
      </h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search series..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSeries.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Series; 