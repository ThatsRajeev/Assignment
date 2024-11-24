# Backend Repository Documentation: Role-Based Access Control (RBAC) Assignment

## Overview

This repository contains the backend server for an authentication and authorization system with **Role-Based Access Control (RBAC)**. The server is built using **Node.js** and **Express** and implements secure authentication mechanisms such as **JWT**, role-based authorization, and flexible user management. 

## Table of Contents

- [Objective](#objective)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [RBAC Features](#rbac-features)
- [Routes](#routes)
- [License](#license)

## Objective

The goal of this project is to provide an example implementation of **authentication**, **authorization**, and **RBAC** for secure backend systems. Users can log in, register, and access protected routes based on their roles. Roles such as **Admin**, **Moderator**, and **User** determine access to various resources.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   PORT=your_server_port
   ```

## Running the Server

1. **Start the server in development mode (with nodemon):**
   ```bash
   npm run dev
   ```

2. **Start the server in production mode:**
   ```bash
   npm start
   ```

## Folder Structure

```plaintext
.
├── controllers
│   ├── auth.controller.js       # Handles authentication logic
│   ├── robots.controller.js     # Placeholder for other features
├── middleware
│   ├── authenticateJwt.js       # JWT-based authentication middleware
│   ├── rbac.js                  # Role-Based Access Control middleware
├── models
│   ├── User.js                  # User model schema (MongoDB)
├── routes
│   ├── auth.routes.js           # Authentication and RBAC-related routes
├── services
│   └── common.js                # Utility functions for user management
├── .env                         # Environment variables
├── app.js                       # Entry point for the application
└── package.json                 # Project metadata and dependencies
```

## Dependencies

- **bcrypt**: Library for hashing passwords.
- **dotenv**: Environment variable management.
- **express**: Node.js web framework.
- **express-validator**: Middleware for input validation.
- **jsonwebtoken**: JSON Web Token implementation.
- **mongoose**: ODM for MongoDB.
- **passport**: Middleware for authentication.
- **passport-jwt**: Passport strategy for JWT.
- **passport-local**: Passport strategy for username/password authentication.
- **xss**: Prevents XSS attacks by sanitizing input.

## RBAC Features

1. **Authentication:**
   - Users can log in with their username and password.
   - Passwords are securely hashed using **bcrypt**.
   - **JWT** is used to manage authentication tokens.

2. **Authorization:**
   - Users are assigned roles during creation (e.g., `Admin`, `Moderator`, `User`).
   - Role-specific access to protected routes is enforced using the `authorizeRoles` middleware.

3. **RBAC Middleware:**
   The `authorizeRoles` middleware ensures that only users with the required roles can access specific endpoints.
   ```javascript
   const authorizeRoles = (roles) => {
       return (req, res, next) => {
           if (!req.user || !roles.some(role => req.user.roles.includes(role))) {
               return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
           }
           next();
       };
   };
   ```

## Routes

### **Authentication Routes**

| **Route**           | **Method** | **Description**                     | **Roles Allowed**     |
|----------------------|------------|-------------------------------------|-----------------------|
| `/api/v1/auth/login` | `POST`     | Log in a user.                     | Any                   |
| `/api/v1/auth/createUser` | `POST` | Create a new user.                 | Admin                 |
| `/api/v1/auth/updateUser` | `POST` | Update an existing user.           | Admin, Moderator      |
| `/api/v1/auth/checkUser`  | `GET`  | Retrieve authenticated user data.  | Any Authenticated User|

---

### **Route Example with RBAC**

#### Protected Route Example (Create User):
```javascript
router.route('/createUser').post(
    passport.authenticate('jwt', { session: false }),
    authorizeRoles(['Admin']), // Restrict access to Admin role
    createUser
);
```

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

---

### For Any Questions or Issues
Feel free to reach out via GitHub or open an issue in the repository.

--- 

This updated documentation highlights the RBAC system and emphasizes the assignment requirements, focusing on security, flexibility, and clarity.
