import { loginUser, registerUser } from './login.js';
import { connection } from './database.js';
import {saveToLibrary} from "./saveToLibrary.js";
import { jwtSecret } from './config.js';
import jwt from 'jsonwebtoken';
import { authenticateUser } from './middleware.js';
import {removeFromLibrary} from "./removeFromLibrary.js";

// Function to set up endpoints
export default function setupEndpoints(app) {
    // Route for user login (POST request)
    app.post('/api/login', loginUser);

    // Route for user registration (POST request)
    app.post('/api/register', registerUser);

    // Route for saving to library (POST request)
    app.post('/api/savetolibrary', authenticateUser, saveToLibrary);

    // Route to delete a monster from the library
    app.delete('/api/removeFromLibrary/:monstersID', (req, res) => {
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
            connection.query('DELETE FROM monsters WHERE usersID = ? AND monstersID = ?', [usersID, monstersIDInt], (err, results) => {
                if (err) {
                    console.error('Error removing monster:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (results.affectedRows === 0) {
                    // No rows affected, monster not found
                    return res.status(404).json({ message: 'Monster not found or not owned by user' });
                }

                // Monster successfully deleted
                res.status(200).json({ message: 'Monster removed successfully' });
            });
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });


// Route to get a user's monster library for viewing (GET request)
    app.get('/api/library', authenticateUser, (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, jwtSecret);

            // Extract user information from decoded token
            const { usersID } = decoded;

            // Fetch user data from the database based on user ID
            connection.query('SELECT * FROM monsters WHERE usersID = ?', [usersID], (err, results) => {
                if (err) {
                    console.error('Error fetching library:', err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                if (results.length === 0) {
                    res.status(404).json({ message: 'library not found' });
                    return;
                }

                const monsters = results;
                //console.log('length is ', monsters[10]);
                res.json(monsters); // Send retrieved user data as a response
            });
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });

// Route to get user details based on JWT token
    app.get('/api/users', authenticateUser, (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, jwtSecret);

            // Extract user information from decoded token
            const { usersId } = decoded;

            // Fetch user data from the database based on user ID
            connection.query('SELECT * FROM users WHERE usersId = ?', [usersId], (err, results) => {
                if (err) {
                    console.error('Error fetching user:', err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                if (results.length === 0) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }

                const users = results[0];
                res.json(users); // Send retrieved user data as a response
            });
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });

    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/body', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    app.get('/api/body', (req, res) => {

        const bodyQuery = 'SELECT mainsvg, texturesvg FROM body WHERE bodyID = 2';

        //Connect to database and make query
        connection.query(bodyQuery, (err, bodyResults) => {
            if (err) {
                console.error('Error fetching random body svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (bodyResults.length === 0) {
                res.status(404).json({message: 'body svg not found'});
                return;
            }
            const bodySVG = bodyResults[0].mainsvg;
            const bodyTextureSVG = bodyResults[0].texturesvg;
            res.json({bodySVG, bodyTextureSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/feet', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });


    // Route to fetch feet SVG
    app.get('/api/feet', (req, res) => {

        // Generate random number for selecting 'feet' SVG file by ID
        let randomFeetNumber = Math.floor(Math.random() * 4) + 7;

        const feetQuery = `SELECT mainsvg, texturesvg FROM feet WHERE feetID = ${randomFeetNumber}`;

        connection.query(feetQuery, (err, feetResults) => {
            if (err) {
                console.error('Error fetching random feet svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (feetResults.length === 0) {
                res.status(404).json({message: 'Feet svg not found'});
                return;
            }

            const feetSVG = feetResults[0].mainsvg;
            const feetTextureSVG = feetResults[0].texturesvg;
            res.json({feetSVG, feetTextureSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/arms', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    // Route to fetch arms SVG
    app.get('/api/arms', (req, res) => {

        //generate random number for selecting Arms SVG file by ID
        const randomArmsNumber = Math.floor(Math.random() * 6) + 11;

        const armsQuery = `SELECT mainsvg, texturesvg FROM arms WHERE armsID = ${randomArmsNumber}`;

        connection.query(armsQuery, (err, armsResults) => {
            if (err) {
                console.error('Error fetching random arms svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (armsResults.length === 0) {
                res.status(404).json({message: 'Arms svg not found'});
                return;
            }

            const armsSVG = armsResults[0].mainsvg;
            const armsTextureSVG = armsResults[0].texturesvg;

            res.json({armsSVG, armsTextureSVG });
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/mouth', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    app.get('/api/mouth', (req, res) => {
        const randomMouthNumber = Math.floor(Math.random() * 10) + 24;

        const mouthQuery = `SELECT mainsvg, texturesvg FROM mouth WHERE mouthID = ${randomMouthNumber}`;


        // Connect to database and make query
        connection.query(mouthQuery, (err, mouthResults) => {
            if (err) {
                console.error('Error fetching random mouth svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (mouthResults.length === 0) {
                res.status(404).json({message: 'Mouth svg not found'});
                return;
            }
            const mouthSVG = mouthResults[0].mainsvg;
            const mouthTextureSVG = mouthResults[0].texturesvg;

            res.json({mouthSVG, mouthTextureSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/tail', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    // Endpoint for a randomized selection of the SVG text for the monster's tail
    app.get('/api/tail', (req, res) => {

        // Generate a random number between 6 and 11 (inclusive)
        let randomTailNumber = Math.floor(Math.random() * 6) + 6;

        // Replace tailID with the random number
        const tailQuery = `SELECT mainsvg, texturesvg FROM tail WHERE tailID = ${randomTailNumber}`;

        // Connect to database and make query
        connection.query(tailQuery, (err, tailResults) => {
            if (err) {
                console.error('Error fetching random tail svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (tailResults.length === 0) {
                res.status(404).json({message: 'Tail svg not found'});
                return;
            }
            const tailSVG = tailResults[0].mainsvg;
            const tailTextureSVG = tailResults[0].texturesvg;
            res.json({tailSVG, tailTextureSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/back', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

// Endpoint for a randomized selection of the SVG text for the monster's back and a texture overlay
    app.get('/api/back', (req, res) => {
        // Generate random number for selecting 'back' SVG file by ID
        const randomBackNumber = Math.floor(Math.random() * 6) + 18;

        const backQuery = `SELECT mainsvg, texturesvg FROM back WHERE backID = ${randomBackNumber}`;


        // Connect to database and make query
        connection.query(backQuery, (err, backResults) => {
            if (err) {
                console.error('Error fetching random back svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (backResults.length === 0) {
                res.status(404).json({message: 'Back svg not found'});
                return;
            }
            const backSVG = backResults[0].mainsvg;
            const backTextureSVG = backResults[0].texturesvg;
            res.json({backSVG, backTextureSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/eyes', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    app.get('/api/eyes', (req, res) => {
        // Generate random number for selecting 'eyes' SVG file by ID
        const randomEyesNumber = Math.floor(Math.random() * 6) + 16;

        const eyesQuery = `SELECT mainsvg FROM eyes WHERE eyesID = ${randomEyesNumber}`;


        // Connect to database and make query
        connection.query(eyesQuery, (err, eyesResults) => {
            if (err) {
                console.error('Error fetching eyes svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (eyesResults.length === 0) {
                res.status(404).json({message: 'Eyes svg not found'});
                return;
            }
            const eyesSVG = eyesResults[0].mainsvg;

            res.json({eyesSVG});
        });
    });


    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/colours', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    app.get('/api/colours', (req, res) => {
        const randomColourNumber = Math.floor(Math.random() * 47) + 1;
        const colourQuery = 'SELECT main, darker, contrast FROM colours WHERE coloursID = ?';

        connection.query(colourQuery, [randomColourNumber], (err, colourResults) => {
            if (err) {
                console.error('Error fetching random color from database:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (colourResults.length === 0) {
                res.status(404).json({message: 'Color not found in the database'});
                return;
            }

            // Extract hex codes from the database results
            const { main } = colourResults[0];
            const { darker } = colourResults[0];
            const { contrast } = colourResults[0];
            res.json({ main, darker, contrast });

        });
    });

    // Route to handle preflight requests for /api/body endpoint
    app.options('/api/randomname', (req, res) => {
        // Respond with appropriate headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.sendStatus(200);
    });

    // Endpoint to select a random name and corresponding adjective
    app.get('/api/randomname', (req, res) => {
        // Generate a random number between 1 and 100 for names
        const randomNameNumber = Math.floor(Math.random() * 99) + 1;

        // Query to select name and gender based on the random number
        const nameQuery = 'SELECT name, gender FROM names WHERE namesID = ?';

        // Execute the query with the random number as parameter for names
        connection.query(nameQuery, [randomNameNumber], (err, nameResults) => {
            if (err) {
                console.error('Error fetching random name:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (nameResults.length === 0) {
                res.status(404).json({ message: 'Name not found' });
                return;
            }

            // Generate a random number between 1 and 50 for adjectives
            const randomAdjectiveNumber = Math.floor(Math.random() * 49) + 1;

            // Query to select adjective based on the random number
            const adjectiveQuery = 'SELECT adjective FROM attributes WHERE attributesID = ?';

            // Execute the query with the random number as parameter for adjectives
            connection.query(adjectiveQuery, [randomAdjectiveNumber], (err, adjectiveResults) => {
                if (err) {
                    console.error('Error fetching random adjective:', err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

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
            });
        });
    });
}
