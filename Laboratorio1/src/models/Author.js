const db = require('../config/db')

const Author = {

    getAll: async () => {
        const [rows] = await db.query('CALL sp_get_all_authors()')
        return rows[0]
    },

    searchByNames: async (search = '') => {
        const normalizedSearch = search.trim()

        if (!normalizedSearch) {
            return []
        }

        const [rows] = await db.query(
            'CALL sp_search_authors_by_names(?)',
            [normalizedSearch]
        )
        return rows[0]
    },

    create: async ({ firstName, lastName, birthDate, nationality, email }) => {
        const [result] = await db.query(
            'CALL sp_create_author(?, ?, ?, ?, ?)',
            [firstName, lastName, birthDate, nationality, email]
        )

        const id = result[0][0].id

        return {
            id,
            firstName,
            lastName,
            birthDate,
            nationality,
            email
        }
    },

    update: async (id, { firstName, lastName, birthDate, nationality, email }) => {
        const [result] = await db.query(
            'CALL sp_update_author(?, ?, ?, ?, ?, ?)',
            [id, firstName, lastName, birthDate, nationality, email]
        )

        const affectedRows = result[0][0].affectedRows
        return affectedRows > 0
    },

    delete: async (id) => {
        const [result] = await db.query(
            'CALL sp_delete_author(?)',
            [id]
        )

        const affectedRows = result[0][0].affectedRows
        return affectedRows > 0
    }
}

module.exports = Author