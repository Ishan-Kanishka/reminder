const express = require('express');
const path = require('path');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');

/**
 * Admin Routes
 * Handles admin-specific functionality
 */

// GET /admin - Show admin dashboard
router.get('/admin', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'));
});

module.exports = router; 