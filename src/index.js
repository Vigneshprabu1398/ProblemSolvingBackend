const express = require("express");
const app = express();
require("dotenv").config();
const connectToDatabase = require("./configs/configDB");

const router = require("./router");

const { PORT, API_PORT, MONGO_DB_URI } = process.env;
const port = PORT || API_PORT || 3000;

app.use(express.json());

// Custom logging middleware
app.use(async (req, res, next) => {
    console.log('Incoming Request:', { path: req.path });
    const startTime = new Date();
    console.log('Request started at:', startTime);
    next();
    res.on('finish', () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;
        console.log('Response sent at:', endTime);
        console.log(`Total response time for '${req.path}' :`, responseTime, 'ms');
    });
});

// Use the router for handling routes
app.use("/", router);

connectToDatabase(MONGO_DB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}....`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to the database:", err);
    });