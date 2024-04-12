import jwt from 'jsonwebtoken';
import { jwtSecret } from './config.js';
export function authenticateUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        console.log('valid token');
        next();
    } catch (error) {
        res.status(403).send('Invalid token.');
    }
}
