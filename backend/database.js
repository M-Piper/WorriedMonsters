import mysql2 from 'mysql2';

// Database connection setup
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_database',
    insecureAuth: true
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Export the connection object for use in other files
export { connection };

// Function to start the database connection
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
