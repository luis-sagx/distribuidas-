const db = require('../config/db')

const Book = {

    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM book')
        return rows
    },

    create: async ({ title, isbn, publicationYear, edition, language, authorId }) => {
        const query = `
            INSERT INTO book (title, isbn, publicationYear, edition, language, authorId) 
            VALUES (?, ?, ?, ?, ?, ?)
        `

        const values = [title, isbn, publicationYear, edition, language, authorId]

        const [result] = await db.query(query, values)

        return {
            message: "Book created successfully",
            data: {
                id: result.insertId,
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
        const query = `
            UPDATE book 
            SET title = ?, isbn = ?, publicationYear = ?, edition = ?, language = ?, authorId = ?
            WHERE id = ?
        `

        const values = [title, isbn, publicationYear, edition, language, authorId, id]

        const [result] = await db.query(query, values)

        return {
            message: result.affectedRows > 0
                ? "Book updated successfully"
                : "Book not found",
            affectedRows: result.affectedRows
        }
    },

    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM book WHERE id = ?',
            [id]
        )

        return {
            message: result.affectedRows > 0
                ? "Book deleted successfully"
                : "Book not found",
            affectedRows: result.affectedRows
        }
    }
}

module.exports = Book