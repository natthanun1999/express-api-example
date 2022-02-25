const sql = require('../providers/db.js')

module.exports = {
  async getAll(search) {
    let query = 'SELECT * FROM students'

    if (search) {
      query += ` WHERE (studentId LIKE '%${search}%' OR firstname LIKE '%${search}%' OR lastname LIKE '%${search}%')`
    }

    try {
      return await sql.query(query)
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async findById(id) {
    try {
      return await sql.query(`SELECT * FROM students WHERE id = ${id}`)
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async create(payload) {
    try {
      const result = await sql.query('INSERT INTO students SET ?', payload)
      return { id: result.insertId, ...payload }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async updateById(id, payload) {
    try {
      const result = await sql.query(`UPDATE students SET studentId=?, firstname=?, lastname=? WHERE id = ${id}`,
        [payload.studentId, payload.firstname, payload.lastname])

      if (result.affectedRows === 0) {
        return null
      }

      return { id, ...payload }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  },
  async deleteById(id) {
    try {
      const result = await sql.query(`DELETE FROM students WHERE id = ${id}`)

      if (result.affectedRows === 0) {
        return null
      }

      return { message: `Deleted item (ID : ${id})` }
    } catch (error) {
      console.log('error: ', error)
      return error
    }
  }
}