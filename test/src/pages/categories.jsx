import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const categoriesData = await api.getCategories(token);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/30 border border-red-500 rounded-md p-4 text-center">
      <p className="text-red-400">Error loading categories: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
            key={category.id} 
            to={`/categories/${category.id}`}
            className="group"
                 >
              <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-green-900/20">
                <div className="relative h-48">
                  <img 
                    src={category.thumbnail || 'https://via.placeholder.com/300x200?text=Category'} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 