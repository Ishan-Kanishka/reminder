const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// Import configurations
const sessionConfig = require('./config/session');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

// Import database connection (this will connect automatically)
require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Middleware Setup
 */

// Serve static files from public directory
app.use(express.static('public'));

// Parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

// Session middleware
app.use(session(sessionConfig));

/**
 * Route Setup
 */

// Authentication routes (login, register, logout)
app.use('/', authRoutes);

// Dashboard routes (user dashboard)
app.use('/', dashboardRoutes);

// Admin routes (admin dashboard)
app.use('/', adminRoutes);

/**
 * Error Handling Middleware
 */

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found. <a href="/">Go home</a>');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong! Please try again.');
});

/**
 * Start Server
 */

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    process.exit(0);
});
