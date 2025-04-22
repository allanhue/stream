const { query } = require('../db');

const getVideos = async (req, res) => {
    try {
        const videos = await query('SELECT * FROM videos ORDER BY created_at DESC');
        res.json(videos.rows);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Error fetching videos' });
    }
};

const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await query('SELECT * FROM videos WHERE id = $1', [id]);
        if (video.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(video.rows[0]);
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ error: 'Error fetching video' });
    }
};

const createVideo = async (req, res) => {
    try {
        const { title, description, url, category_id } = req.body;
        const result = await query(
            'INSERT INTO videos (title, description, url, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, url, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ error: 'Error creating video' });
    }
};

const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, url, category_id } = req.body;
        const result = await query(
            'UPDATE videos SET title = $1, description = $2, url = $3, category_id = $4 WHERE id = $5 RETURNING *',
            [title, description, url, category_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating video:', error);
        res.status(500).json({ error: 'Error updating video' });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('DELETE FROM videos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({ error: 'Error deleting video' });
    }
};

const streamVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await query('SELECT url FROM videos WHERE id = $1', [id]);
        if (video.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }
        // For now, just return the URL. In a production environment,
        // you would want to implement proper video streaming
        res.json({ streamUrl: video.rows[0].url });
    } catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).json({ error: 'Error streaming video' });
    }
};

const getVideosByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const videos = await query('SELECT * FROM videos WHERE category_id = $1', [categoryId]);
        res.json(videos.rows);
    } catch (error) {
        console.error('Error fetching videos by category:', error);
        res.status(500).json({ error: 'Error fetching videos by category' });
    }
};

module.exports = {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    streamVideo,
    getVideosByCategory
}; 