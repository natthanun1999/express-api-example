const Student = require('../models/student.js')

module.exports = {
  async getAll(req, res) {
    try {
      const search = req.query.search
      const result = await Student.getAll(search)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving students.'
      })
    }
  },
  async findById(req, res) {
    try {
      const result = await Student.findById(req.params.id)

      if (!result?.length) {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving student.'
      })
    }
  },
  async create(req, res) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content cannot be empty.'
        })
      }
  
      const student = {
        studentId: req.body.studentId,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }

      const result = await Student.create(student)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating student.'
      })
    }
  },
  async updateById(req, res) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content cannot be empty.'
        })
      }
  
      const student = {
        studentId: req.body.studentId,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }

      const result = await Student.updateById(req.params.id, student)

      if (!result) {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while updating student.'
      })
    }
  },
  async deleteById(req, res) {
    try {
      const result = await Student.deleteById(req.params.id)

      if (!result) {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while deleting student.'
      })
    }
  }
}