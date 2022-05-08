const Tutorial = require('../models/tutorial')

module.exports = {
  async getAll(req, res) {
    try {
      const title = req.query.title
      const result = await Tutorial.getAll(title)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.'
      })
    }
  },
  async getAllPublished(req, res) {
    try {
      const result = await Tutorial.getAllPublished()
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving published tutorials.'
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
  
      const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
      }

      const result = await Tutorial.create(tutorial)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating tutorial.'
      })
    }
  },
  async findById(req, res) {
    try {
      const result = await Tutorial.findById(req.params.id)

      if (!result?.length) {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving tutorial.'
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
  
      const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
      }

      const result = await Tutorial.updateById(req.params.id, tutorial)

      if (!result) {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while updating tutorial.'
      })
    }
  },
  async deleteById(req, res) {
    try {
      const result = await Tutorial.deleteById(req.params.id)

      if (!result) {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}`
        })
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while deleting tutorial.'
      })
    }
  }
}