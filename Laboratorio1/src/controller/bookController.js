const book = require('../models/Book')

const getAllBooks = async (req, res) => {
    try {
        const books = await book.getAll()
        res.json(books)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ message: 'Error fetching books' })
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = await book.create(req.body)
        res.status(201).json(newBook)
    } catch (error) {
        console.error('Error creating book:', error)
        res.status(500).json({ message: 'Error creating book' })
    }
}

const updateBook = async (req, res) => {
    try {
        const updatedBook = await book.update(req.body, req.params.id)
        res.json(updatedBook)
    } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).json({ message: 'Error updating book' })
    }
}

const deleteBook = async (req, res) => {
    try {
        const result = await book.delete(req.params.id)
        res.json(result)
    } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).json({ message: 'Error deleting book' })
    }
}

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}