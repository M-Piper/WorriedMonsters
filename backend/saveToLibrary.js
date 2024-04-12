import jwt from 'jsonwebtoken';
import { connection } from "./database.js";

export function saveToLibrary(req, res) {
    const isLoggedIn= localStorage.getItem('isLoggedIn');
    const usersID = localStorage.getItem('usersID');
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, 'abcdef');

        // Extract userID from decoded JWT token
        const { usersID } = decoded;

        // Check if all required parameters are provided
        const { combinedSVG, name } = req.body;
        if (!combinedSVG || !name) {
            res.status(400).json({ message: 'Missing parameters: combinedSVG or name' });
            return;
        }

        // Insert the combined SVG into the database along with the user ID
        const insertQuery = 'INSERT INTO monsters (usersID, combinedSVG, name) VALUES (?, ?, ?)';
        connection.query(insertQuery, [usersID, combinedSVG, name], (err, results) => {
            if (err) {
                console.error('Error saving to library:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            res.status(201).json({ message: 'Combined SVG saved to library successfully' });
        });
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}
