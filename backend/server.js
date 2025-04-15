//set up express server
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection immediately
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed');
        console.error(err.message);
    } else {
        console.log('✅ Database connected successfully');
    }
});

// Test route
app.get("/telemed/test", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            message: "Backend is connected!",
            timestamp: result.rows[0].now
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});



//define the routes
app.get("/telemed/",(req,res)=>{
    res.send("Hello World");
})

//set up express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

