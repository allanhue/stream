import React from 'react';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="group">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
                <div className="relative pb-[150%]">
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                        }}
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{movie.release_date?.split('-')[0] || 'N/A'}</span>
                        <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
                            {movie.vote_average?.toFixed(1) || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}; 