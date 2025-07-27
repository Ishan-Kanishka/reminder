const express = require('express');
const path = require('path');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

/**
 * Dashboard Routes
 * Handles user dashboard functionality
 */

// GET /dashboard - Show user dashboard
router.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

// GET / - Redirect to dashboard if logged in, otherwise to login
router.get('/', (req, res) => {
    if (req.session.user) {
        if (req.session.user.username === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/dashboard');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router; 