import jwt from 'jsonwebtoken';
import { connection } from './database.js';
export function registerUser(req, res) {
    const { username, password } = req.body;
    // Insert the new user into the database
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Registration successful
        res.status(201).json({ message: 'User registered successfully' });
    });
}


export function getUserDetails(req, res) {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

    try {
        const decoded = jwt.verify(token, 'secret'); // Verify JWT token

        // Extract username from decoded JWT token
        const { username } = decoded;

        // Fetch user details from the database based on username
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Error fetching user details:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const user = results[0];

            // Respond with user details
            res.json({ username: user.username, userID: user.userID });
        });
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Function to handle user login
export function loginUser(req, res) {
    // Authenticate user
    const { username, password } = req.body;

    // Replace this with your actual authentication logic (e.g., database lookup)
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const user = results[0];

        // Compare passwords directly
        if (password === user.password) {
            // Passwords match, generate JWT token
            const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
            res.json({ token, userID: user.userID });
            console.log(user);
        } else {
            // Passwords don't match
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
}
