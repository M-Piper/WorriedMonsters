import loginUser from './login.js'; // Import loginUser function
import { connection } from './database.js';
import jwt from 'jsonwebtoken';


// Function to set up endpoints
export default function setupEndpoints(app) {
// Route for user login (POST request)
app.post('/api/login', loginUser);

// Route for user to add monster to their library (POST request)
//app.post('api/library/add', monsterName, combinedSVG, userID);

//Route to get a user's monster library for viewing (GET request)
  //  app.get('api/library/:username'), (req, res)=>{

  //  }

// Route to get a specific user by username (GET request)
    app.get('/api/users/:username', (req, res) => {
        const username = req.params.username;

        // Fetch user data from the database based on the username
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({message: 'Internal server error'});
                return;
            }

            if (results.length === 0) {
                res.status(404).json({message: 'User not found'});
                return;
            }

            const user = results[0]; // Assuming there's only one user with the given username
            res.json({...user, username}); // Send retrieved user data as a response
        });
    });


    app.get('/api/body', (req, res) => {

        const bodyQuery = 'SELECT mainsvg FROM body WHERE bodyID = 1';

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

            res.json({bodySVG});
        });
    });

    // Route to fetch feet SVG
    app.get('/api/feet', (req, res) => {

        // Generate random number for selecting 'feet' SVG file by ID
        const randomFeetNumber = Math.floor(Math.random() * 4) + 1;

        const feetQuery = `SELECT mainsvg FROM feet WHERE feetID = ${randomFeetNumber}`;

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
            res.json({feetSVG});
        });
    });

    // Route to fetch arms SVG
    app.get('/api/arms', (req, res) => {

        //generate random number for selecting Arms SVG file by ID
        const randomArmsNumber = Math.floor(Math.random() * 3) + 5;

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

    app.get('/api/mouth', (req, res) => {
        const randomMouthNumber = Math.floor(Math.random() * 11) + 11;

        const mouthQuery = `SELECT mainsvg FROM mouth WHERE mouthID = ${randomMouthNumber}`;


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

            res.json({mouthSVG});
        });
    });

    // Endpoint for a randomized selection of the SVG text for the monster's tail
    app.get('/api/tail', (req, res) => {

        // Generate a random number between 1 and 3 (inclusive)
        const randomTailNumber = Math.floor(Math.random() * 3) + 1;

        // Replace tailID with the random number
        const tailQuery = `SELECT mainsvg FROM tail WHERE tailID = ${randomTailNumber}`;

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

            res.json({tailSVG});
        });
    });

// Endpoint for a randomized selection of the SVG text for the monster's back and a texture overlay
    // Select between 1 and 5 options
    app.get('/api/back', (req, res) => {
        // Generate random number for selecting 'back' SVG file by ID
        const randomBackNumber = Math.floor(Math.random() * 13) + 1;

        const backQuery = `SELECT mainsvg FROM back WHERE backID = ${randomBackNumber}`;


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

            res.json({backSVG});
        });
    });

    app.get('/api/eyes', (req, res) => {
        // Generate random number for selecting 'eyes' SVG file by ID
        const randomEyesNumber= Math.floor(Math.random() * 6) + 9;

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
