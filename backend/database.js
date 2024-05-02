import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

export function startDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) {
                console.error('Error connecting to database:', err);
                reject(err);
                return;
            }
            console.log('Connected to MySQL database');
            resolve();
        });
    });
}
