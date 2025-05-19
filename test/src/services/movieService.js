import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const movieService = {
  // Fetch trending movies
  getTrendingMovies: async (page = 1) => {
    try {
      const response = await api.get(`/movies/trending/movies?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Fetch trending TV shows
  getTrendingTV: async (page = 1) => {
    try {
      const response = await api.get(`/movies/trending/tv?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
      throw error;
    }
  },

  // Fetch trending people
  getTrendingPeople: async (page = 1) => {
    try {
      const response = await api.get(`/movies/trending/people?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending people:', error);
      throw error;
    }
  },

  // Fetch movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Fetch movie videos
  getMovieVideos: async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}/videos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      throw error;
    }
  },

  // Fetch upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await api.get(`/movies/upcoming?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  }
}; 