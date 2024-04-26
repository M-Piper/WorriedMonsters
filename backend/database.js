import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const urlDB = 'mysql://root:gxeqHlAgqDmGdvMrXYgQnOWxMYTFxVrV@viaduct.proxy.rlwy.net:54913/railway';
    //`mysql://${process.env.MYSQLUSER}: ${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

// Database connection setup
const connection = mysql2.createConnection(urlDB);

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
