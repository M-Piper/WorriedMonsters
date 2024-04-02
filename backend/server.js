import express from 'express';
import bodyParser from 'body-parser';
import setupEndpoints from './endpoints.js'; // Import endpoint setup function
import {connection, startDatabase} from './database.js';
import cors from 'cors';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Use middleware to parse incoming request bodies
app.use(bodyParser.json());

// Initialize database connection and start server
startDatabase()
    .then(() => {
        // Set up endpoints after database connection is established
        setupEndpoints(app);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error starting server:', err);
    });
