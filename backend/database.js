// database.js
import mysql2 from 'mysql2/promise';

export function startDatabase() {
    return mysql2.createConnection({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQLDATABASE,
        port: process.env.MYSQLPORT
    });
}