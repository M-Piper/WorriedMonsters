import jwt from 'jsonwebtoken';
import jwtSecret from './config.js';

// Update the removeFromLibrary function to handle DELETE requests and get ID from params
// Update the removeFromLibrary function to accept connection as a parameter
export async function removeFromLibrary(connection, req, res) {
    try {
        // Get monstersID from URL parameters
        const { monstersID } = req.params;

        if (!monstersID) {
            res.status(400).json({ message: 'Missing monstersID' });
            return;
        }

        // Delete the monster identified by monstersID
        const [results] = await connection.execute('DELETE FROM monsters WHERE monstersID = ?', [monstersID]);

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Monster not found in the library' });
            return;
        }

        res.status(200).json({ message: 'Monster deleted from library successfully' });
    } catch (error) {
        console.error('Error deleting from library:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
/*
export function removeFromLibrary(req, res) {
        // Get monstersID from URL parameters
       const { monstersID } = req.params;

        if (!monstersID) {
            res.status(400).json({ message: 'Missing monstersID' });
            return;
        }

        // Delete the monster identified by monstersID and the user ID
        const deleteQuery = 'DELETE FROM monsters WHERE monstersID = ?';
        connection.query(deleteQuery, [monstersID], (err, results) => {
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
}
*/
