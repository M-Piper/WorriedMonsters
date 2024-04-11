import {connection} from "./database.js";

export function saveToLibrary(req, res) {
    const { userID, combinedSVG, name } = req.body;
        // Insert the combined SVG into the database along with the user ID
        const insertQuery = 'INSERT INTO monsters (userID, combinedSVG, name) VALUES (?, ?, ?)';
        connection.query(insertQuery, [userID, combinedSVG, name], (err, results) => {
            if (err) {
                console.error('Error saving to library:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            res.status(201).json({ message: 'Combined SVG saved to library successfully' });
        });
}