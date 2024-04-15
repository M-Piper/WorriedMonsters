import jwt from 'jsonwebtoken';
import { connection } from "./database.js";
import { jwtSecret } from './config.js';

// Update the removeFromLibrary function to handle DELETE requests and get ID from params
export function removeFromLibrary(req, res) {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, jwtSecret);

        // Extract userID from decoded JWT token
        const { usersID } = decoded;

        // Get monstersID from URL parameters
       const { monstersID } = req.params;

        if (!monstersID) {
            res.status(400).json({ message: 'Missing monstersID' });
            return;
        }

        // Delete the monster identified by monstersID and the user ID
        const deleteQuery = 'DELETE FROM monsters WHERE usersID = ? AND monstersID = ?';
        connection.query(deleteQuery, [usersID, monstersID], (err, results) => {
            if (err) {
                console.error('Error deleting from library:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Monster not found in the library' });
                return;
            }

            res.status(200).json({ message: 'Monster deleted from library successfully' });
        });
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}
