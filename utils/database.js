const db = require('../config/database');
const bcrypt = require('bcrypt');

/**
 * Database Utility Functions
 * Handles common database operations
 */

// Find user by username
const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // Return first (and should be only) result
            }
        });
    });
};

// Create new user
const createUser = (username, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
            [username, hashedPassword], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

// Hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Compare password with hash
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Check if username exists
const usernameExists = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) as count FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0].count > 0);
            }
        });
    });
};

module.exports = {
    findUserByUsername,
    createUser,
    hashPassword,
    comparePassword,
    usernameExists
}; 