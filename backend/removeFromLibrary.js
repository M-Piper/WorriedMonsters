import jwt from 'jsonwebtoken';
import jwtSecret from './config.js';

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
