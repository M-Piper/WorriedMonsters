import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

export default jwtSecret;
