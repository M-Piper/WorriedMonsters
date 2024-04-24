import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import setupEndpoints from './endpoints.js'; // Import endpoint setup function
import { startDatabase } from './database.js';
import cors from 'cors';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Custom middleware to add the custom header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});


// Use middleware to parse incoming request bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Initialize database connection and start server
startDatabase()
    .then(() => {
        // Set up endpoints after database connection is established
        setupEndpoints(app);

        // HTTPS options (replace 'path/to/private/key.pem' and 'path/to/certificate.crt' with actual paths)
        const httpsOptions = {
            key: fs.readFileSync('./monster.pem'),
            //cert: fs.readFileSync('path/to/certificate.crt'),
        };

        // Create HTTPS server
        https.createServer(httpsOptions, app).listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error starting server:', err);
    });
