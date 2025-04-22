const API_KEY = 'd881cdf1f6c1128b5c25a821b11020f7';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
  async getPopularMovies() {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc`,
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genres: movie.genre_ids // We'll need to fetch genre names separately
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  async getMovieGenres() {
    try {
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc`,
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }

      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  async getPopularTVShows() {
    try {
      const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc`,
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch TV shows');
      }

      const data = await response.json();
      return data.results.map(show => ({
        id: show.id,
        title: show.name,
        overview: show.overview,
        poster_path: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        first_air_date: show.first_air_date,
        vote_average: show.vote_average,
        genres: show.genre_ids
      }));
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      throw error;
    }
  }
};

export default tmdbService; 