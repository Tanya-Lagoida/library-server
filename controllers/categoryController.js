const {BooksGenresType} = require('../models/models')
const ApiError = require('../error/apiError')
class CategoryController {
  async create (req, res) {
    const {id, name, path} = req.body
    const category = await BooksGenresType.create({id, name, path})
    return res.json(category)
  }
  async gettingAListOfBookGenres (req, res){
    const categories = await BooksGenresType.findAll()
    return res.json(categories)
  }
}

module.exports = new CategoryController()