const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
  //Write your code here
  username = req.body.username
  password = req.username.password





  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
   if (books){
    books = JSON.stringify(
        books
    )
    res.status(200).json({message:books})
  }
 

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  if (books){
    isbn = req.params.isbn
    const book = books[isbn]
    res.status(200).json({message:book})
  }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  if (books){
    isbn = req.params.author
    const book = books[isbn]
    res.status(200).json({message:book})
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  if (books){
    isbn = req.params.author
    const book = books[isbn]
    res.status(200).json({message:book})
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  //Write your code here
  if (books){
    isbn = req.params.isbn
    const book = books[isbn]
    
    res.status(200).json({message:book.reviews})
  }
  return res.status(300).json({message: "Yet to be implemented"});
});


module.exports.general = public_users;
