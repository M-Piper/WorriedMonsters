// loginForm.js

import jwt from 'jsonwebtoken';
import { connection } from './database.js';



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
            res.json({ token });
            console.log("match; token =>", token);
        } else {
            // Passwords don't match
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
}

export default loginUser;
