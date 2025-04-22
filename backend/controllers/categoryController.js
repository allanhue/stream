const { pool } = require('../db');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const query = `
                SELECT 
                    id,
                    name,
                    description,
                    thumbnail,
                    created_at,
                    updated_at
                FROM categories
                ORDER BY name ASC
            `;
            
            const result = await pool.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Error fetching categories' });
        }
    }
};

module.exports = categoryController; 