const express = require('express')
const TutorialController = require('../controllers/tutorial')
const route = express.Router()

route.get('/', TutorialController.getAll)
route.get('/published', TutorialController.getAllPublished)
route.get('/:id', TutorialController.findById)
route.post('/', TutorialController.create)
route.put('/:id', TutorialController.updateById)
route.delete('/:id', TutorialController.deleteById)

module.exports = route