// index.js
import express from 'express';
import bodyParser from 'body-parser';
import setupEndpoints from './endpoints.js';
import dotenv from "dotenv";
import { startDatabase } from './database.js';
import cors from 'cors';

dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 54913;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize database connection and start server
startDatabase()
    .then((connection) => {
        // Set up endpoints after database connection is established
        setupEndpoints(app, connection);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    })
    .catch(err => {
        console.error('Error starting server:', err);
    });
