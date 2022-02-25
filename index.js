const express = require('express')
const cors = require('cors')
const route = require('./routes/student.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' })
})
app.use('/students', route)

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})