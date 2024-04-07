import loginUser from './login.js'; // Import loginUser function
import { connection } from './database.js';
import jwt from 'jsonwebtoken';

// Function to set up endpoints
export default function setupEndpoints(app) {
    // Route for user login (POST request)
    app.post('/api/login', loginUser);


// Route to get a specific user by username (GET request)
    app.get('/api/users/:username', (req, res) => {
        const username = req.params.username; // Retrieve the username from the route parameter

        // Fetch user data from the database based on the username
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const user = results[0]; // Assuming there's only one user with the given username
            res.json({ ...user, username }); // Send the retrieved user data as a response
        });
    });


//Endpoint for a randomized selection of the SVG text for the monster's body and a texture overlay
    //select between 1 and 5 options
    app.get('/api/body', (req, res) => {
            //const randomBodyNumber = Math.floor(Math.random() * 5) + 1;

            // Query to select name and gender based on the random number
            //TEMPORARILY HARD CODED TO RETRIEVE 1 SINCE THERE IS ONLY 1 ENTRY DURING DEBUGGING
            const bodyQuery = 'SELECT mainsvg, texturesvg FROM body WHERE bodyID = 1';

            //Connect to database and make query
            //connection.query(bodyQuery, [randomBodyNumber], (err, bodyResults) => {
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

    // Endpoint for a randomized selection of the SVG text for the monster's feet and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/feet', (req, res) => {
        // Query to select mainsvg and texturesvg for feet based on the given ID
        // Temporarily hardcoded to retrieve 1 during debugging
        const feetQuery = 'SELECT mainsvg, texturesvg FROM feet WHERE feetID = 1';

        // Connect to database and make query
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

// Endpoint for a randomized selection of the SVG text for the monster's face and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/face', (req, res) => {
        // Query to select mainsvg and texturesvg for face based on the given ID
        // Temporarily hardcoded to retrieve 1 during debugging
        const faceQuery = 'SELECT mainsvg, texturesvg FROM face WHERE faceID = 1';

        // Connect to database and make query
        connection.query(faceQuery, (err, faceResults) => {
            if (err) {
                console.error('Error fetching random face svg file:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (faceResults.length === 0) {
                res.status(404).json({message: 'Face svg not found'});
                return;
            }
            const faceSVG = faceResults[0].mainsvg;
            const faceTextureSVG = faceResults[0].texturesvg;

            res.json({faceSVG, faceTextureSVG});
        });
    });

// Endpoint for a randomized selection of the SVG text for the monster's arms and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/arms', (req, res) => {
        // Query to select mainsvg and texturesvg for arms based on the given ID
        // Temporarily hardcoded to retrieve 1 during debugging
        const armsQuery = 'SELECT mainsvg, texturesvg FROM arms WHERE armsID = 1';

        // Connect to database and make query
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

            res.json({armsSVG, armsTextureSVG});
        });
    });

// Endpoint for a randomized selection of the SVG text for the monster's tail and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/tail', (req, res) => {
        // Query to select mainsvg and texturesvg for tail based on the given ID
        // Temporarily hardcoded to retrieve 1 during debugging
        const tailQuery = 'SELECT mainsvg, texturesvg FROM tail WHERE tailID = 1';

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

// Endpoint for a randomized selection of the SVG text for the monster's back and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/back', (req, res) => {
        // Query to select mainsvg and texturesvg for back based on the given ID
        // Temporarily hardcoded to retrieve 1 during debugging
        const backQuery = 'SELECT mainsvg, texturesvg FROM back WHERE backID = 1';

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
