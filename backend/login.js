import jwt from 'jsonwebtoken';
import jwtSecret from "./config.js";

export async function registerUser(connection, req, res) {
    const { username, password } = req.body;

    try {
        // Check if the username already exists in the database
        const [existingUsers] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUsers.length > 0) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        // Insert the new user into the database
        await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        // Registration successful
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
}

export async function loginUser(connection, req, res) {
    const { username, password } = req.body;

    try {
        // Fetch user from the database based on username and password
        const [results] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const user = results[0];

        // Generate JWT token
        const token = jwt.sign({ username, usersID: user.usersID }, jwtSecret, { expiresIn: '1h' });

        res.json({ token, usersID: user.usersID, username: user.username });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
    };
}
