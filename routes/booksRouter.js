const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')

router.post('/', booksController.create)
router.post('/:id', booksController.createById)
router.get('/', booksController.gettingAListOfBooks)
router.get('/:id', booksController.gettingABookById)

module.exports = router