const { pool } = require('../db');

const subscriptionService = {
    // Create a new subscription
    createSubscription: async (userId, planType, duration) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);

            const result = await client.query(
                `INSERT INTO subscriptions (user_id, plan_type, status, start_date, end_date)
                 VALUES ($1, $2, 'active', $3, $4)
                 RETURNING *`,
                [userId, planType, startDate, endDate]
            );

            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    // Get user's active subscription
    getActiveSubscription: async (userId) => {
        const result = await pool.query(
            `SELECT * FROM subscriptions 
             WHERE user_id = $1 
             AND status = 'active' 
             AND end_date > NOW()
             ORDER BY end_date DESC
             LIMIT 1`,
            [userId]
        );
        return result.rows[0];
    },

    // Update subscription status
    updateSubscriptionStatus: async (subscriptionId, status) => {
        const result = await pool.query(
            `UPDATE subscriptions 
             SET status = $1, updated_at = NOW()
             WHERE id = $2
             RETURNING *`,
            [status, subscriptionId]
        );
        return result.rows[0];
    },

    // Get subscription history
    getSubscriptionHistory: async (userId) => {
        const result = await pool.query(
            `SELECT * FROM subscriptions 
             WHERE user_id = $1 
             ORDER BY created_at DESC`,
            [userId]
        );
        return result.rows;
    }
};

module.exports = subscriptionService; 