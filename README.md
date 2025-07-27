# Reminder Application - Node.js Project

## 📋 Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Current Features](#current-features)
- [Missing Features](#missing-features)
- [Code Architecture](#code-architecture)
- [File Structure Explanation](#file-structure-explanation)
- [Development Guidelines](#development-guidelines)

## 🎯 Overview

This is a **Node.js web application** that provides user authentication and role-based access control. It's designed as a reminder application (though the reminder functionality is not yet implemented). The app uses Express.js for the web server, MySQL for the database, and includes user registration, login, and session management.

**✨ NEW: The codebase has been completely refactored with a modular architecture for better maintainability and scalability!**

## 📁 Project Structure

```
reminder/
├── config/                 # Configuration files
│   ├── database.js         # Database connection configuration
│   └── session.js          # Session configuration
├── middleware/             # Custom middleware
│   └── auth.js            # Authentication middleware
├── routes/                 # Route handlers
│   ├── auth.js            # Authentication routes (login, register, logout)
│   ├── dashboard.js       # Dashboard routes
│   └── admin.js          # Admin routes
├── utils/                  # Utility functions
│   └── database.js        # Database helper functions
├── views/                  # HTML templates
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # User dashboard
│   ├── admin.html         # Admin dashboard
│   └── home.html         # Home page (currently empty)
├── public/                 # Static files (CSS, JS, images)
├── server.js              # Main application file (clean and modular)
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
└── node_modules/         # Installed dependencies
```

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Authentication**: bcrypt for password hashing
- **Sessions**: express-session for user sessions
- **Frontend**: Plain HTML (no CSS framework yet)
- **Architecture**: Modular MVC-like structure

## 🚀 Setup Instructions

### Prerequisites
1. **Node.js** (version 18 or higher)
2. **MySQL** (XAMPP, WAMP, or standalone MySQL server)
3. **Git** (optional, for version control)

### Step 1: Clone/Download the Project
```bash
# If using Git
git clone <repository-url>
cd reminder

# Or simply download and extract the project folder
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up MySQL Database
1. Start your MySQL server (XAMPP/WAMP)
2. Open phpMyAdmin or MySQL command line
3. Create a new database:
```sql
CREATE DATABASE reminder_app;
USE reminder_app;
```

4. Create the users table:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 4: Configure Database Connection
The database connection is configured in `config/database.js`. The current settings are:
- Host: localhost
- User: root
- Password: (empty - default for XAMPP)
- Database: reminder_app

If your MySQL setup is different, modify these settings in `config/database.js`:
```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Change this if needed
    database: 'reminder_app'
};
```

### Step 5: Run the Application
```bash
node server.js
```

The server will start on `http://localhost:3000`

## 🔧 How It Works

### 1. **Server Setup** (`server.js`)
- Creates an Express.js web server
- Imports and configures middleware
- Sets up routes from separate files
- Handles errors and graceful shutdown

### 2. **Authentication Flow**
1. **Registration**: Users can create accounts with username/password
   - Passwords are hashed using bcrypt for security
   - Duplicate usernames are prevented
   - Basic validation is performed
   
2. **Login**: Users authenticate with their credentials
   - Passwords are verified against hashed versions
   - Sessions are created for logged-in users
   - Role-based redirection occurs
   
3. **Role-Based Access**: 
   - Regular users → Dashboard
   - Admin user → Admin panel

### 3. **Session Management**
- Uses `express-session` to maintain user sessions
- Sessions persist user login state across requests
- Logout destroys the session

## ✅ Current Features

- ✅ **Modular Architecture** - Clean, organized code structure
- ✅ **User registration** with password hashing and validation
- ✅ **User login** with credential verification
- ✅ **Session management** with proper security
- ✅ **Role-based access control** (admin vs regular users)
- ✅ **Authentication middleware** for route protection
- ✅ **Database utilities** for common operations
- ✅ **Error handling** throughout the application
- ✅ **Basic HTML pages** for login, register, dashboard, and admin
- ✅ **MySQL database integration** with connection management
- ✅ **Form handling and validation**

## ❌ Missing Features

- ❌ **Reminder functionality** (the main purpose!)
- ❌ **CSS styling** (pages are plain HTML)
- ❌ **Client-side validation** (only server-side validation)
- ❌ **Password reset** functionality
- ❌ **User profile management**
- ❌ **Security headers** and CSRF protection
- ❌ **Environment variables** for configuration
- ❌ **Logging system** for debugging
- ❌ **API endpoints** for AJAX requests

## 🏗️ Code Architecture

### **Modular Design Principles**

The application follows these architectural principles:

1. **Separation of Concerns**: Each file has a single responsibility
2. **DRY (Don't Repeat Yourself)**: Common functionality is extracted into utilities
3. **Middleware Pattern**: Authentication and validation are handled by middleware
4. **Configuration Management**: Settings are separated from business logic
5. **Error Handling**: Consistent error handling throughout the application

### **File Organization**

#### **Configuration Layer** (`config/`)
- **`database.js`**: Database connection and configuration
- **`session.js`**: Session configuration and settings

#### **Middleware Layer** (`middleware/`)
- **`auth.js`**: Authentication and authorization middleware
  - `requireAuth`: Protects routes requiring authentication
  - `requireAdmin`: Protects admin-only routes
  - `requireGuest`: Redirects logged-in users away from auth pages

#### **Route Layer** (`routes/`)
- **`auth.js`**: Authentication routes (login, register, logout)
- **`dashboard.js`**: User dashboard routes
- **`admin.js`**: Admin-specific routes

#### **Utility Layer** (`utils/`)
- **`database.js`**: Database helper functions
  - `findUserByUsername`: Find user by username
  - `createUser`: Create new user
  - `hashPassword`: Hash passwords
  - `comparePassword`: Compare password with hash
  - `usernameExists`: Check if username exists

#### **Main Application** (`server.js`)
- Clean, minimal main file
- Imports and configures all modules
- Sets up middleware and routes
- Handles errors and server startup

## 📝 File Structure Explanation

### **Configuration Files**

#### **`config/database.js`**
```javascript
// Database connection with error handling
const db = mysql.createConnection(dbConfig);

// Automatic reconnection on connection loss
db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        db.connect(); // Reconnect automatically
    }
});
```

#### **`config/session.js`**
```javascript
// Secure session configuration
const sessionConfig = {
    secret: 'your-secret-key-change-this-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true for HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};
```

### **Middleware Files**

#### **`middleware/auth.js`**
```javascript
// Authentication middleware examples
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next(); // Continue to route
    } else {
        res.status(401).send('Please log in first');
    }
};

const requireAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.username === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied');
    }
};
```

### **Route Files**

#### **`routes/auth.js`**
- **GET `/login`**: Show login page
- **GET `/register`**: Show registration page
- **POST `/register`**: Handle user registration with validation
- **POST `/login`**: Handle user login with authentication
- **GET `/logout`**: Handle user logout

#### **`routes/dashboard.js`**
- **GET `/dashboard`**: Show user dashboard (protected)
- **GET `/`**: Redirect based on user status

#### **`routes/admin.js`**
- **GET `/admin`**: Show admin dashboard (admin-only)

### **Utility Files**

#### **`utils/database.js`**
```javascript
// Promise-based database operations
const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};
```

### **Main Server File**

#### **`server.js`**
```javascript
// Clean, organized main file
const app = express();

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// Route setup
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong!');
});
```

## 🎓 Development Guidelines

### **Adding New Features**

1. **New Routes**: Create a new file in `routes/` directory
2. **New Middleware**: Add to `middleware/` directory
3. **Database Operations**: Add to `utils/database.js`
4. **Configuration**: Add to appropriate file in `config/` directory

### **Code Style**

- Use **async/await** for asynchronous operations
- Use **Promise-based** database operations
- Add **proper error handling** to all functions
- Use **descriptive variable names**
- Add **comments** for complex logic
- Follow **consistent indentation** (2 spaces)

### **Security Best Practices**

- **Never store passwords** in plain text
- **Validate all inputs** on both client and server
- **Use HTTPS** in production
- **Set secure session cookies**
- **Implement rate limiting** for auth routes
- **Use environment variables** for sensitive data

### **Error Handling**

```javascript
// Good error handling example
try {
    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).send('User not found');
    }
    // ... rest of the code
} catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Login failed. Please try again.');
}
```

## 🔍 Key Concepts for Beginners

### **What is Node.js?**
Node.js is a JavaScript runtime that allows you to run JavaScript on the server-side (not just in the browser).

### **What is Express.js?**
Express is a web framework for Node.js that simplifies building web applications and APIs.

### **What is Middleware?**
Middleware functions are functions that have access to the request and response objects. They can:
- Parse request data
- Add authentication
- Log requests
- Handle errors

### **What are Routes?**
Routes define how your application responds to different HTTP requests (GET, POST, etc.) at different URLs.

### **What is Session Management?**
Sessions allow the server to remember information about users across multiple requests (like keeping them logged in).

### **What is Modular Architecture?**
Modular architecture means breaking your code into smaller, focused files that each handle a specific part of your application.

## 🎯 Next Steps for Learning

1. **Understand the modular structure** - Study how files connect
2. **Add reminder functionality** - Create CRUD operations for reminders
3. **Add CSS styling** - Make the interface look professional
4. **Implement client-side validation** - Add JavaScript validation
5. **Add environment variables** - Use `.env` file for configuration
6. **Add logging** - Implement proper logging system
7. **Add tests** - Write unit tests for your functions

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot connect to MySQL"**
   - Make sure MySQL server is running
   - Check database credentials in `config/database.js`
   - Verify database and table exist

2. **"Module not found" errors**
   - Run `npm install` to install dependencies
   - Check file paths in import statements

3. **"Port already in use"**
   - Change the port number in `server.js`
   - Or kill the process using the port

4. **"Session not working"**
   - Check if `express-session` is properly configured
   - Verify session secret is set in `config/session.js`

5. **"Route not found"**
   - Check if route file is properly imported in `server.js`
   - Verify route path and HTTP method

## 🚀 Performance Tips

1. **Use connection pooling** for database connections
2. **Implement caching** for frequently accessed data
3. **Optimize database queries** with proper indexing
4. **Use compression middleware** for responses
5. **Implement rate limiting** to prevent abuse

---

**Happy Coding! 🚀**

This refactored project demonstrates professional Node.js development practices with a clean, modular architecture. It's a great foundation for building scalable web applications! 