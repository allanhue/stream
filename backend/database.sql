CREATE DATABASE Lan prime;

//create user table for streaming appication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name VARCHAR(255),
    avatar TEXT,
    preferences JSONB,
    watch_history JSONB
);

/* Additional tables for content metadata, subscriptions, payments, etc. */
