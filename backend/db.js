const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
const initDatabase = async () => {
    try {
        // Create movies table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS movies (
                id SERIAL PRIMARY KEY,
                tmdb_id INTEGER UNIQUE,
                title VARCHAR(255) NOT NULL,
                overview TEXT,
                release_date DATE,
                poster_path VARCHAR(255),
                backdrop_path VARCHAR(255),
                vote_average DECIMAL(3,1),
                vote_count INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create genres table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS genres (
                id SERIAL PRIMARY KEY,
                tmdb_id INTEGER UNIQUE,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create movie_genres junction table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS movie_genres (
                movie_id INTEGER REFERENCES movies(id),
                genre_id INTEGER REFERENCES genres(id),
                PRIMARY KEY (movie_id, genre_id)
            )
        `);

        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Store movie data from TMDB
const storeMovie = async (movieData) => {
    try {
        const { id, title, overview, release_date, poster_path, backdrop_path, vote_average, vote_count, genre_ids } = movieData;

        // Insert or update movie
        const movieResult = await pool.query(`
            INSERT INTO movies (tmdb_id, title, overview, release_date, poster_path, backdrop_path, vote_average, vote_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (tmdb_id) DO UPDATE
            SET title = $2, overview = $3, release_date = $4, poster_path = $5, backdrop_path = $6, vote_average = $7, vote_count = $8, updated_at = CURRENT_TIMESTAMP
            RETURNING id
        `, [id, title, overview, release_date, poster_path, backdrop_path, vote_average, vote_count]);

        const movieId = movieResult.rows[0].id;

        // Store genres
        for (const genreId of genre_ids) {
            // First, ensure the genre exists
            const genreResult = await pool.query(`
                INSERT INTO genres (tmdb_id, name)
                VALUES ($1, $2)
                ON CONFLICT (tmdb_id) DO NOTHING
                RETURNING id
            `, [genreId, getGenreName(genreId)]);

            if (genreResult.rows.length > 0) {
                const genreId = genreResult.rows[0].id;
                // Link movie to genre
                await pool.query(`
                    INSERT INTO movie_genres (movie_id, genre_id)
                    VALUES ($1, $2)
                    ON CONFLICT DO NOTHING
                `, [movieId, genreId]);
            }
        }

        return movieId;
    } catch (error) {
        console.error('Error storing movie:', error);
        throw error;
    }
};

// Helper function to get genre name from TMDB ID
const getGenreName = (genreId) => {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    return genres[genreId] || 'Unknown';
};

// Initialize database on module load
initDatabase();

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
    storeMovie
}; 