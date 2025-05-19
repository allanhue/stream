# Movie Streaming Platform

A modern movie streaming platform built with React, Node.js, and TMDB API.

## Features

- Browse trending movies and TV shows
- View upcoming movies
- Watch movie trailers
- Add movies to favorites
- Track watch history
- View movie recommendations
- Responsive design for all devices
- Secure API key handling

## Tech Stack

- Frontend:
  - React
  - Vite
  - Tailwind CSS
  - Framer Motion
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express
  - TMDB API

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd streaming
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../test
npm install
```

3. Configure environment variables:

Backend (.env):
```
PORT=3000
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Frontend (.env):
```
VITE_API_URL=http://localhost:3000/api
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../test
npm run dev
```

## Project Structure

```
streaming/
├── backend/
│   ├── routes/
│   │   └── movies.js
│   ├── server.js
│   └── .env
└── test/
    ├── src/
    │   ├── components/
    │   │   ├── MovieCard.jsx
    │   │   ├── TrendingSection.jsx
    │   │   ├── UpcomingMovies.jsx
    │   │   └── VideoPlayer.jsx
    │   ├── contexts/
    │   │   └── MovieContext.jsx
    │   ├── services/
    │   │   └── movieService.js
    │   └── pages/
    │       ├── Home.jsx
    │       └── MovieDetails.jsx
    └── .env
```

## API Endpoints

### Backend Routes

- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/:id/videos` - Get movie videos/trailers
- `GET /api/movies/:id/recommendations` - Get movie recommendations
- `GET /api/movies/:id/similar` - Get similar movies
- `GET /api/movies/:id/credits` - Get movie credits

## Features in Detail

### Movie Details Page
- Hero section with backdrop image
- Movie information (title, rating, release date, runtime)
- Overview/synopsis
- Watch trailer button
- Add to favorites functionality
- Recommended movies section

### Recommendations
- Personalized movie recommendations based on the current movie
- Similar movies suggestions
- Responsive grid layout
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
