CREATE DATABASE Lan prime;

//create user table for streaming appication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name VARCHAR(255),
    avatar TEXT,
    preferences JSONB,
    watch_history JSONB
);

CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    tmdb_id INTEGER UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    backdrop_path VARCHAR(255),
    release_date DATE,
    vote_average DECIMAL(3,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    movie_id INTEGER REFERENCES movies(id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, movie_id)
);

CREATE TABLE IF NOT EXISTS streaming_links (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id),
    quality VARCHAR(20),
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    plan_id INT REFERENCES plans(id),
    status VARCHAR(50),
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

/* Additional tables for content metadata, subscriptions, payments, etc. */

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_movies_tmdb_id ON movies(tmdb_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_streaming_links_movie_id ON streaming_links(movie_id);
