const express = require('express')

const authorRouter = express.Router();
const bookRouter = express.Router();

const {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controller/authorController')

const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
} = require('../controller/bookController')

// Author routes
authorRouter.get('/', getAllAuthors)
authorRouter.post('/', createAuthor)
authorRouter.put('/:id', updateAuthor)
authorRouter.delete('/:id', deleteAuthor)

// Book routes
bookRouter.get('/', getAllBooks)
bookRouter.post('/', createBook)
bookRouter.put('/:id', updateBook)
bookRouter.delete('/:id', deleteBook)

module.exports = { authorRouter, bookRouter }