import jwt from 'jsonwebtoken';
import jwtSecret from "./config.js";
export function registerUser(req, res) {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            res.status(500).json({ message: 'Failed to register user' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        // Insert the new user into the database
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ message: 'Failed to register user' });
                return;
            }

            // Registration successful
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
}

export function loginUser(req, res) {
    const { username, password } = req.body;

    // Fetch user from the database based on username and password
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Failed to fetch user' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const user = results[0];

        // Generate JWT token
        const token = jwt.sign({ username, usersID: user.usersID }, jwtSecret, { expiresIn: '1h' });

        res.json({ token, usersID: user.usersID, username: user.username });
    });
}
