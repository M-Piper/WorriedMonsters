import loginUser from './login.js'; // Import loginUser function
import { connection } from './database.js';


// Function to set up endpoints
export default function setupEndpoints(app) {
    // Route for user login (POST request)
    app.post('/api/login', loginUser);

    // Route to get all users (GET request)
    app.get('/api/users', (req, res) => {
        // Fetch user data from the database
        connection.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.json(results); // Send the retrieved user data as a response
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
