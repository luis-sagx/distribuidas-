const db = require('../config/db')

const Book = {

    getAll: async () => {
        const [rows] = await db.query('CALL sp_get_all_books()')
        return rows[0]
    },

    create: async ({ title, isbn, publicationYear, edition, language, authorId }) => {
        const [result] = await db.query(
            'CALL sp_create_book(?, ?, ?, ?, ?, ?)',
            [title, isbn, publicationYear, edition, language, authorId]
        )

        const id = result[0][0].id

        return {
            message: "Book created successfully",
            data: {
                id,
                title,
                isbn,
                publicationYear,
                edition,
                language,
                authorId
            }
        }
    },

    update: async ({ title, isbn, publicationYear, edition, language, authorId }, id) => {
        const [result] = await db.query(
            'CALL sp_update_book(?, ?, ?, ?, ?, ?, ?)',
            [id, title, isbn, publicationYear, edition, language, authorId]
        )

        const affectedRows = result[0][0].affectedRows

        return {
            message: affectedRows > 0
                ? "Book updated successfully"
                : "Book not found",
            affectedRows
        }
    },

    delete: async (id) => {
        const [result] = await db.query(
            'CALL sp_delete_book(?)',
            [id]
        )

        const affectedRows = result[0][0].affectedRows

        return {
            message: affectedRows > 0
                ? "Book deleted successfully"
                : "Book not found",
            affectedRows
        }
    }
}

module.exports = Book