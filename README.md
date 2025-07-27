# Reminder Application - Node.js Project

## 📋 Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Current Features](#current-features)
- [Missing Features](#missing-features)
- [Suggested Improvements](#suggested-improvements)
- [File Structure Explanation](#file-structure-explanation)

## 🎯 Overview

This is a **Node.js web application** that provides user authentication and role-based access control. It's designed as a reminder application (though the reminder functionality is not yet implemented). The app uses Express.js for the web server, MySQL for the database, and includes user registration, login, and session management.

## 📁 Project Structure

```
reminder/
├── server.js              # Main application file (Express server)
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── views/                 # HTML templates
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # User dashboard
│   ├── admin.html         # Admin dashboard
│   └── home.html         # Home page (currently empty)
└── node_modules/         # Installed dependencies
```

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Authentication**: bcrypt for password hashing
- **Sessions**: express-session for user sessions
- **Frontend**: Plain HTML (no CSS framework yet)

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
The database connection is configured in `server.js`. The current settings are:
- Host: localhost
- User: root
- Password: (empty - default for XAMPP)
- Database: reminder_app

If your MySQL setup is different, modify these settings in `server.js`:
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Change this if needed
    database: 'reminder_app'
});
```

### Step 5: Run the Application
```bash
node server.js
```

The server will start on `http://localhost:3000`

## 🔧 How It Works

### 1. **Server Setup** (`server.js`)
- Creates an Express.js web server
- Sets up middleware for parsing form data and managing sessions
- Establishes MySQL database connection
- Defines routes for different pages

### 2. **Authentication Flow**
1. **Registration**: Users can create accounts with username/password
   - Passwords are hashed using bcrypt for security
   - Duplicate usernames are prevented
   
2. **Login**: Users authenticate with their credentials
   - Passwords are verified against hashed versions
   - Sessions are created for logged-in users
   
3. **Role-Based Access**: 
   - Regular users → Dashboard
   - Admin user → Admin panel

### 3. **Session Management**
- Uses `express-session` to maintain user sessions
- Sessions persist user login state across requests
- Logout destroys the session

## ✅ Current Features

- ✅ User registration with password hashing
- ✅ User login with credential verification
- ✅ Session management
- ✅ Role-based access control (admin vs regular users)
- ✅ Basic HTML pages for login, register, dashboard, and admin
- ✅ MySQL database integration
- ✅ Form handling and validation

## ❌ Missing Features

- ❌ **Reminder functionality** (the main purpose!)
- ❌ **CSS styling** (pages are plain HTML)
- ❌ **Input validation** (no client-side validation)
- ❌ **Error handling** (basic error messages)
- ❌ **Password reset** functionality
- ❌ **User profile management**
- ❌ **Security headers** and CSRF protection
- ❌ **Environment variables** for configuration

## 🚀 Suggested Improvements

### 1. **Better File Structure**
```
reminder/
├── config/
│   ├── database.js        # Database configuration
│   └── session.js         # Session configuration
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── dashboard.js       # Dashboard routes
│   └── admin.js          # Admin routes
├── models/
│   └── User.js           # User model
├── middleware/
│   ├── auth.js           # Authentication middleware
│   └── validation.js     # Input validation
├── views/
│   ├── layouts/
│   │   └── main.html     # Base layout template
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   └── dashboard/
│       ├── user.html
│       └── admin.html
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── server.js
└── package.json
```

### 2. **Add Reminder Functionality**
- Create reminders table in database
- Add CRUD operations for reminders
- Implement reminder notifications

### 3. **Improve Security**
- Add input validation
- Implement CSRF protection
- Use environment variables for sensitive data
- Add rate limiting

### 4. **Enhance User Experience**
- Add CSS styling
- Implement client-side validation
- Add loading states
- Improve error messages

## 📝 File Structure Explanation

### **server.js** (Main Application File)
This is the heart of your application. It:
- Sets up the Express server
- Configures middleware (body-parser, sessions)
- Establishes database connection
- Defines all routes
- Starts the server on port 3000

### **package.json**
Contains project metadata and dependencies:
- `express`: Web framework
- `mysql`: MySQL database driver
- `bcrypt`: Password hashing
- `express-session`: Session management
- `body-parser`: Parse form data

### **views/ Directory**
Contains HTML templates:
- `login.html`: User login form
- `register.html`: User registration form
- `dashboard.html`: Regular user dashboard
- `admin.html`: Admin dashboard
- `home.html`: Currently empty home page

### **node_modules/ Directory**
Contains all installed npm packages (created when you run `npm install`)

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

## 🎓 Next Steps for Learning

1. **Learn the basics**: Understand JavaScript, HTTP, and web concepts
2. **Study Express.js**: Learn about routing, middleware, and templating
3. **Database concepts**: Understand SQL and database relationships
4. **Security**: Learn about authentication, authorization, and security best practices
5. **Frontend**: Add CSS and JavaScript to improve the user interface

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot connect to MySQL"**
   - Make sure MySQL server is running
   - Check database credentials in `server.js`
   - Verify database and table exist

2. **"Module not found" errors**
   - Run `npm install` to install dependencies

3. **Port already in use**
   - Change the port number in `server.js`
   - Or kill the process using the port

4. **Session not working**
   - Check if `express-session` is properly configured
   - Verify session secret is set

---

**Happy Coding! 🚀**

This project is a great starting point for learning Node.js web development. Start by understanding the current code, then gradually add the missing features to build a complete reminder application. 