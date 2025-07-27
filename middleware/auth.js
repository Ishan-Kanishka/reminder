/**
 * Authentication Middleware
 * Checks if user is logged in and handles role-based access
 */

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated, continue
    } else {
        res.status(401).send('Please log in first. <a href="/login">Login</a>');
    }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.username === 'admin') {
        next(); // User is admin, continue
    } else {
        res.status(403).send('Access denied. Admin privileges required. <a href="/login">Login</a>');
    }
};

// Middleware to check if user is NOT authenticated (for login/register pages)
const requireGuest = (req, res, next) => {
    if (!req.session.user) {
        next(); // User is not logged in, continue
    } else {
        // User is already logged in, redirect to appropriate dashboard
        if (req.session.user.username === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/dashboard');
        }
    }
};

module.exports = {
    requireAuth,
    requireAdmin,
    requireGuest
}; 