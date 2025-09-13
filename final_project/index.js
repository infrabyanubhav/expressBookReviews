const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Authentication middleware for protected customer routes
app.use("/customer/auth/*", (req, res, next) => {
    const authData = req.session.authorization;

    if (authData && authData.accessToken) {
        const token = authData.accessToken;

        jwt.verify(token, "access", (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            req.user = decoded.data;  // Attach username from token
            next();
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

// Route setup
app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
