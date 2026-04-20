const db = require('../config/db')

const Author = {

    findAll: async (search = '') => {
        const normalizedSearch = search.trim()

        let query = `
            SELECT id, firstName, lastName, birthDate, nationality, email
            FROM author
        `
        let params = []

        if (normalizedSearch) {
            query += `
                WHERE firstName LIKE ? 
                   OR lastName LIKE ?
            `
            const pattern = `%${normalizedSearch}%`
            params = [pattern, pattern]
        }

        const [rows] = await db.query(query, params)
        return rows
    },

    create: async ({ firstName, lastName, birthDate, nationality, email }) => {
        const [result] = await db.query(
            `INSERT INTO author (firstName, lastName, birthDate, nationality, email) 
             VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, birthDate, nationality, email]
        )

        return {
            id: result.insertId,
            firstName,
            lastName,
            birthDate,
            nationality,
            email
        }
    },

    update: async (id, { firstName, lastName, birthDate, nationality, email }) => {
        const [result] = await db.query(
            `UPDATE author 
             SET firstName = ?, lastName = ?, birthDate = ?, nationality = ?, email = ?
             WHERE id = ?`,
            [firstName, lastName, birthDate, nationality, email, id]
        )

        return result.affectedRows > 0
    },

    delete: async (id) => {
        const [result] = await db.query(
            `DELETE FROM author WHERE id = ?`,
            [id]
        )

        return result.affectedRows > 0
    }
}

module.exports = Author