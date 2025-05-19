import express from 'express';
import axios from 'axios';

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Get trending movies
router.get('/trending/movies', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/trending/movie/day`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US',
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
});

// Get trending TV shows
router.get('/trending/tv', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/trending/tv/day`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US',
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trending TV shows:', error);
        res.status(500).json({ error: 'Failed to fetch trending TV shows' });
    }
});

// Get trending people
router.get('/trending/people', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/trending/person/day`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US',
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trending people:', error);
        res.status(500).json({ error: 'Failed to fetch trending people' });
    }
});

// Get popular movies
router.get('/popular', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/popular`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US',
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
});

// Get now playing movies
router.get('/now-playing', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/now_playing`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US',
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        res.status(500).json({ error: 'Failed to fetch now playing movies' });
    }
});

// Get user's custom lists
router.get('/lists', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/account/${process.env.TMDB_ACCOUNT_ID}/lists`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching custom lists:', error);
        res.status(500).json({ error: 'Failed to fetch custom lists' });
    }
});

// Get user's watchlist
router.get('/watchlist', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/account/${process.env.TMDB_ACCOUNT_ID}/watchlist/tv`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US',
                    page: req.query.page || 1,
                    sort_by: req.query.sort_by || 'created_at.asc'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
});

// Get movie details
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/${req.params.id}`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

// Get movie videos/trailers
router.get('/:id/videos', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/${req.params.id}/videos`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'accept': 'application/json'
                },
                params: {
                    language: 'en-US'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        res.status(500).json({ error: 'Failed to fetch movie videos' });
    }
});

// Search movies
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/search/movie`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US',
                    query: req.query.query,
                    page: req.query.page || 1
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

// Get upcoming movies
router.get('/upcoming', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
            {
                headers: {
export default router; 

// Get movie recommendations
router.get('/:id/recommendations', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/${id}/recommendations?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch movie recommendations' });
  }
}); 