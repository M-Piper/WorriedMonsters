import jwt from 'jsonwebtoken';
import jwtSecret from './config.js';

export function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        console.log('valid token');
        next();
    } catch (error) {
        res.status(403).send('Invalid token.');
    }
}
