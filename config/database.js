const mysql = require('mysql');

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // default for XAMPP
    database: 'reminder_app'
};

// Create database connection
const db = mysql.createConnection(dbConfig);

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log("✅ Connected to MySQL database");
});

// Handle database connection errors
db.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection was closed. Reconnecting...');
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db; 