const mysql = require('mysql')
const util = require('util')
const dotenv = require('dotenv')

dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect((error) => {
  if (error) throw error

  console.log('Successfully connected to the database.')
})

connection.query = util.promisify(connection.query)

module.exports = connection