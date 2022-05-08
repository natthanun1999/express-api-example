const sql = require('../providers/db.js')

module.exports = {
  async getAll(title) {
    let query = 'SELECT * FROM tutorials'

    if (title) {
      query += ` WHERE title LIKE '%${title}%'`
    }

    try {
      return await sql.query(query)
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async getAllPublished() {
    try {
      return await sql.query('SELECT * FROM tutorials WHERE published != 0')
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async create(newTutorial) {
    try {
      const result = await sql.query('INSERT INTO tutorials SET ?', newTutorial)
      return { id: result.insertId, ...newTutorial }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async findById(id) {
    try {
      return await sql.query(`SELECT * FROM tutorials WHERE id = ${id}`)
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async updateById(id, newTutorial) {
    try {
      const result = await sql.query(`UPDATE tutorials SET title=?, description=?, published=? WHERE id = ${id}`,
        [newTutorial.title, newTutorial.description, newTutorial.published])

      if (result.affectedRows === 0) {
        return null
      }

      return { id, ...newTutorial }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async deleteById(id) {
    try {
      const result = await sql.query(`DELETE FROM tutorials WHERE id = ${id}`)

      if (result.affectedRows === 0) {
        return null
      }

      return { id }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  }
}