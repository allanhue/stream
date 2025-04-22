const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./middlewares');

// Auth routes
router.post('/auth/login', authController.login);
   try{
       const query= req.query.q;
       const response= await axios.get(`https://api.example.com/search?q=${query}`);

         res.json(response.data);
   }
   catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Error fetching data' });
   }
router.post('/auth/logout', authenticateToken, authController.logout);  


router.post('/auth/register', authController.register);






// Protected routes
router.get('/videos', authenticateToken, videoController.getVideos);

// In your Movies component
// useEffect(() => {
//     const fetchMovies = async () => {
//         try {
//             const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY');
//             const data = await response.json();
//             setMovies(data.results.map(movie => ({
//                 id: movie.id,
//                 title: movie.title,
//                 year: new Date(movie.release_date).getFullYear(),
//                 rating: movie.vote_average / 2, // Convert 10-point scale to 5-point
//                 thumbnail: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
//                 backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
//                 description: movie.overview,
//                 genre: movie.genre_ids.map(id => {
//                     // You would have a genre map based on TMDB genre IDs
//                     const genres = {
//                         28: 'Action',
//                         12: 'Adventure',
//                         // etc...
//                     };
//                     return genres[id] || 'Unknown';
//                 })
//             })));
//             setLoading(false);
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };

//     fetchMovies();
// }, []);
router.get('/categories', authenticateToken, categoryController.getCategories);

module.exports = router;