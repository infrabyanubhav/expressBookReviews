const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const regd_users = express.Router();
let users = [];

// Check if the username is valid
const isValid = async (username) => {
    return username && username.length > 0;
}

// Check if a user with the given username already exists
const doesExist = async (username) => {
    let usersWithSameName = users.filter(user => user.username === username);
    return usersWithSameName.length > 0;
}

// Authenticate user (username & password check)
const authenticatedUser = async (username, password) => {
    let validUsers = users.filter(user => user.username === username && user.password === password);
    return validUsers.length > 0;
}

// Only registered users can login
regd_users.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (await authenticatedUser(username, password)) {
        const accessToken = jwt.sign({ data: username }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({ message: "Logged in successfully", token: accessToken });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add or modify a book review
regd_users.put("/review/:isbn", async (req, res) => {
    const username = req.session.authorization?.username;

    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    const isbn = req.params.isbn;
    const content = req.body.content;

    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Invalid ISBN" });
    }

    book.reviews[username] = content;

    return res.status(200).json({ message: "Review added/updated successfully", book });
});

// Delete a book review
regd_users.delete("/review/:isbn", async (req, res) => {
    const username = req.session.authorization?.username;

    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Invalid ISBN" });
    }

    delete book.reviews[username];

    return res.status(200).json({ message: "Review deleted successfully", book });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
