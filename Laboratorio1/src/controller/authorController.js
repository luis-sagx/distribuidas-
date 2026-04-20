const author = require('../models/Author')

const getAllAuthors = async (req, res) => {
    try {
        const search = req.query.search ?? req.query.q ?? ''
        const authors = await author.findAll(search)

        res.json({
            success: true,
            data: authors
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching authors'
        })
    }
}

const createAuthor = async (req, res) => {
    try {
        const newAuthor = await author.create(req.body)

        res.status(201).json({
            success: true,
            message: 'Author created successfully',
            data: newAuthor
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error creating author'
        })
    }
}

const updateAuthor = async (req, res) => {
    try {
        const updated = await author.update(req.params.id, req.body)

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            })
        }

        res.json({
            success: true,
            message: 'Author updated successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error updating author'
        })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const deleted = await author.delete(req.params.id)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            })
        }

        res.json({
            success: true,
            message: 'Author deleted successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error deleting author'
        })
    }
}

module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}