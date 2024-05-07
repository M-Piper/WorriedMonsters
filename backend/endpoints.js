import { loginUser, registerUser } from './login.js';
import {saveToLibrary} from "./saveToLibrary.js";
import jwtSecret from './config.js';
import jwt from 'jsonwebtoken';
// Import middleware function for authentication
import { authenticateUser } from './middleware.js';
import {removeFromLibrary} from "./removeFromLibrary.js";
import mysql from 'mysql2/promise';

// Function to set up endpoints
export default function setupEndpoints(app, connection) {
    // Route for user login (POST request)
    app.post('/api/login', (req, res) => loginUser(connection, req, res));

    // Route for user registration (POST request)
    //app.post('/api/register', registerUser);
    app.post('/api/register', (req, res) => registerUser(connection, req, res));

    // Route for saving to library (POST request)
    //app.post('/api/savetolibrary', authenticateUser, saveToLibrary);
    app.post('/api/savetolibrary', authenticateUser, (req, res) => saveToLibrary(connection, req, res));


    // Route to delete a monster from the library
    app.delete('/api/removeFromLibrary/:monstersID', async (req, res) => {
        // Extract the monstersID from the request parameters
        const { monstersID } = req.params;

        // Ensure monstersID is a valid integer
        const monstersIDInt = parseInt(monstersID);
        if (isNaN(monstersIDInt)) {
            return res.status(400).json({ message: 'Invalid monstersID' });
        }

        // Get user ID from JWT token
        const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header
        try {
            // Verify JWT token
            const decoded = jwt.verify(token, jwtSecret);

            // Extract user ID from decoded token
            const { usersID } = decoded;

            // Perform database query to delete the monster
            const [results] = await connection.query('DELETE FROM monsters WHERE usersID = ? AND monstersID = ?', [usersID, monstersIDInt]);


            if (results.affectedRows === 0) {
                    // No rows affected, monster not found
                    return res.status(404).json({ message: 'Monster not found or not owned by user' });
                }

                // Monster successfully deleted
                res.status(200).json({ message: 'Monster removed successfully' });
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });


    // Initialize MySQL connection pool
    const pool = mysql.createPool(connection.config);

// Route to get a user's monster library for viewing (GET request)
    app.get('/api/library', authenticateUser, async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, jwtSecret);

            // Extract user information from decoded token
            const { usersID } = decoded;

            // Fetch user data from the database based on user ID
            const [results] = await pool.execute('SELECT * FROM monsters WHERE usersID = ?', [usersID]);

            if (results.length === 0) {
                    res.status(404).json({ message: 'library not found' });
                    return;
                }

                const monsters = results;
                res.json(monsters); // Send retrieved user data as a response
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });

// Route to get user details based on JWT token
    app.get('/api/users', authenticateUser, async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, jwtSecret);

            // Extract user information from decoded token
            const { usersId } = decoded;


            // Fetch user data from the database based on user ID
            const [results] = await pool.execute('SELECT * FROM users WHERE usersID = ?', [usersID]);


                if (results.length === 0) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }

                const users = results[0];
                res.json(users); // Send retrieved user data as a response
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });


    app.get('/api/body', async (req, res) => {
    try {
        const bodyQuery = 'SELECT mainsvg, texturesvg FROM body WHERE bodyID = 2';

        //Connect to database and make query
        const [bodyResults] = await pool.execute(bodyQuery);

        if (bodyResults.length === 0) {
            res.status(404).json({message: 'body svg not found'});
            return;
        }
        const bodySVG = bodyResults[0].mainsvg;
        const bodyTextureSVG = bodyResults[0].texturesvg;
        res.json({bodySVG, bodyTextureSVG});

      } catch (error) {
        console.error('Error fetching body SVG:', error);
        res.status(500).json({message: 'Internal server error'});
        }
    });

    // Route to fetch feet SVG
    app.get('/api/feet', async (req, res) => {
    try{
        // Generate random number for selecting 'feet' SVG file by ID
        let randomFeetNumber = Math.floor(Math.random() * 4) + 7;

        const feetQuery = `SELECT mainsvg, texturesvg FROM feet WHERE feetID = ${randomFeetNumber}`;


        //Connect to database and make query
        const [feetResults] = await pool.execute(feetQuery);

            if (feetResults.length === 0) {
                res.status(404).json({message: 'Feet svg not found'});
                return;
            }

            const feetSVG = feetResults[0].mainsvg;
            const feetTextureSVG = feetResults[0].texturesvg;
            res.json({feetSVG, feetTextureSVG});
        } catch (error) {
        console.error('Error fetching feet SVG:', error);
        res.status(500).json({message: 'Internal server error'});
    }
    });

    // Route to fetch arms SVG
    app.get('/api/arms', async (req, res) => {
    try{
        //generate random number for selecting Arms SVG file by ID
        const randomArmsNumber = Math.floor(Math.random() * 6) + 11;

        const armsQuery = `SELECT mainsvg, texturesvg FROM arms WHERE armsID = ${randomArmsNumber}`;

        //Connect to database and make query
        const [armsResults] = await pool.execute(armsQuery);


        if (armsResults.length === 0) {
                res.status(404).json({message: 'Arms svg not found'});
                return;
            }

            const armsSVG = armsResults[0].mainsvg;
            const armsTextureSVG = armsResults[0].texturesvg;

            res.json({armsSVG, armsTextureSVG });
    } catch (error) {
        console.error('Error fetching arms SVG:', error);
        res.status(500).json({message: 'Internal server error'});
    }
    });

    app.get('/api/mouth', async (req, res) => {
        try {
            const randomMouthNumber = Math.floor(Math.random() * 10) + 24;

            const mouthQuery = `SELECT mainsvg, texturesvg
                                FROM mouth
                                WHERE mouthID = ${randomMouthNumber}`;


            //Connect to database and make query
            const [mouthResults] = await pool.execute(mouthQuery);

            if (mouthResults.length === 0) {
                res.status(404).json({message: 'Mouth svg not found'});
                return;
            }
            const mouthSVG = mouthResults[0].mainsvg;
            const mouthTextureSVG = mouthResults[0].texturesvg;

            res.json({mouthSVG, mouthTextureSVG});
         }catch (error) {
                console.error('Error fetching mouth SVG:', error);
                res.status(500).json({message: 'Internal server error'});
            }
        });

    // Endpoint for a randomized selection of the SVG text for the monster's tail
    app.get('/api/tail', async (req, res) => {
    try{
        // Generate a random number between 6 and 11 (inclusive)
        let randomTailNumber = Math.floor(Math.random() * 6) + 6;

        // Replace tailID with the random number
        const tailQuery = `SELECT mainsvg, texturesvg FROM tail WHERE tailID = ${randomTailNumber}`;

        //Connect to database and make query
        const [tailResults] = await pool.execute(tailQuery);

            if (tailResults.length === 0) {
                res.status(404).json({message: 'Tail svg not found'});
                return;
            }
            const tailSVG = tailResults[0].mainsvg;
            const tailTextureSVG = tailResults[0].texturesvg;
            res.json({tailSVG, tailTextureSVG});
        } catch (error) {
            console.error('Error fetching tail SVG:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    });

// Endpoint for a randomized selection of the SVG text for the monster's back and a texture overlay
    app.get('/api/back', async (req, res) => {
        try{
        // Generate random number for selecting 'back' SVG file by ID
        const randomBackNumber = Math.floor(Math.random() * 6) + 18;

        const backQuery = `SELECT mainsvg, texturesvg FROM back WHERE backID = ${randomBackNumber}`;


            //Connect to database and make query
            const [backResults] = await pool.execute(backQuery);

            if (backResults.length === 0) {
                res.status(404).json({message: 'Back svg not found'});
                return;
            }
            const backSVG = backResults[0].mainsvg;
            const backTextureSVG = backResults[0].texturesvg;
            res.json({backSVG, backTextureSVG});
        } catch (error) {
                console.error('Error fetching back SVG:', error);
                res.status(500).json({message: 'Internal server error'});
            }
        });

    app.get('/api/eyes', async (req, res) => {
        try{

        // Generate random number for selecting 'eyes' SVG file by ID
        const randomEyesNumber = Math.floor(Math.random() * 6) + 16;

        const eyesQuery = `SELECT mainsvg FROM eyes WHERE eyesID = ${randomEyesNumber}`;


            //Connect to database and make query
            const [eyesResults] = await pool.execute(eyesQuery);

            if (eyesResults.length === 0) {
                res.status(404).json({message: 'Eyes svg not found'});
                return;
            }
            const eyesSVG = eyesResults[0].mainsvg;

            res.json({eyesSVG});
        } catch (error) {
                console.error('Error fetching eyes SVG:', error);
                res.status(500).json({message: 'Internal server error'});
            }
        });

    app.get('/api/colours', async (req, res) => {
        try{
        const randomColourNumber = Math.floor(Math.random() * 60) + 49;
        const colourQuery = 'SELECT main, darker, contrast FROM colours WHERE coloursID = ?';

            // Execute the query with the random colour number as parameter
            const [colourResults] = await pool.execute(colourQuery, [randomColourNumber]);

            if (colourResults.length === 0) {
                res.status(404).json({ message: 'Color not found in the database' });
                return;
            }
            // Extract hex codes from the database results
            const { main, darker, contrast } = colourResults[0];
            res.json({ main, darker, contrast });
        } catch (error) {
            console.error('Error fetching random color from database:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


// Endpoint to select a random name and corresponding adjective
    app.get('/api/randomname', async (req, res) => {
        try {
            // Generate a random number between 1 and 100 for names
            const randomNameNumber = Math.floor(Math.random() * 99) + 1;

            // Query to select name and gender based on the random number
            const nameQuery = 'SELECT name, gender FROM names WHERE namesID = ?';

            // Execute the query with the random number as parameter for names
            const [nameResults] = await pool.execute(nameQuery, [randomNameNumber]);

            if (nameResults.length === 0) {
                res.status(404).json({ message: 'Name not found' });
                return;
            }

            // Generate a random number between 1 and 50 for adjectives
            const randomAdjectiveNumber = Math.floor(Math.random() * 49) + 1;

            // Query to select adjective based on the random number
            const adjectiveQuery = 'SELECT adjective FROM attributes WHERE attributesID = ?';

            // Execute the query with the random number as parameter for adjectives
            const [adjectiveResults] = await pool.execute(adjectiveQuery, [randomAdjectiveNumber]);

            if (adjectiveResults.length === 0) {
                res.status(404).json({ message: 'Adjective not found' });
                return;
            }

            const name = nameResults[0].name;
            const gender = nameResults[0].gender;
            const adjective = adjectiveResults[0].adjective;

            // Construct the final output
            const output = `${name} the ${adjective}`;

            res.json({ name, gender, adjective, output });
        } catch (error) {
            console.error('Error fetching random name:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
