const express = require('express');
const path = require('path');
const router = express.Router();
const { requireGuest } = require('../middleware/auth');
const { 
    findUserByUsername, 
    createUser, 
    hashPassword, 
    comparePassword, 
    usernameExists 
} = require('../utils/database');

/**
 * Authentication Routes
 * Handles login, register, and logout
 */

// GET /login - Show login page
router.get('/login', requireGuest, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// GET /register - Show register page
router.get('/register', requireGuest, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});

// POST /register - Handle user registration
router.post('/register', requireGuest, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).send('Username and password are required. <a href="/register">Try again</a>');
        }

        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters. <a href="/register">Try again</a>');
        }

        // Check if user already exists
        const exists = await usernameExists(username);
        if (exists) {
            return res.status(400).send('Username already exists. <a href="/register">Try again</a>');
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user
        await createUser(username, hashedPassword);

        res.send('Registration successful! <a href="/login">Go to login</a>');

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Registration failed. Please try again. <a href="/register">Back to register</a>');
    }
});

// POST /login - Handle user login
router.post('/login', requireGuest, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).send('Username and password are required. <a href="/login">Try again</a>');
        }

        // Find user
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(401).send('User not found. <a href="/login">Try again</a>');
        }

        // Verify password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send('Incorrect password. <a href="/login">Try again</a>');
        }

        // Create session
        req.session.user = {
            id: user.id,
            username: user.username
        };

        // Redirect based on role
        if (user.username === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/dashboard');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login failed. Please try again. <a href="/login">Back to login</a>');
    }
});

// GET /logout - Handle user logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
});

module.exports = router; 