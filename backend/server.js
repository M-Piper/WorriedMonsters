import express from 'express';
import bodyParser from 'body-parser';
import setupEndpoints from './endpoints.js'; // Import endpoint setup function
import {connection, startDatabase} from './database.js';
import cors from 'cors';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://54.82.71.40:5000',
};


// Custom middleware to add the custom header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});


// Use middleware to parse incoming request bodies
// Increase the limit to 50MB (or any desired limit)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
