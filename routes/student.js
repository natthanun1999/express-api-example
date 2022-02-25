const express = require('express')
const StudentController = require('../controllers/student.js')
const route = express.Router()

route.get('/', StudentController.getAll)
route.get('/:id', StudentController.findById)
route.post('/', StudentController.create)
route.put('/:id', StudentController.updateById)
route.delete('/:id', StudentController.deleteById)

module.exports = route