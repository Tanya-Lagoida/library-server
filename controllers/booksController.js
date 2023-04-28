const uuid = require('uuid');
const path = require('path')
const {BooksType, CommentsType, TBooksByIdType} = require('../models/models')
const ApiError = require('../error/apiError')
const {DataTypes, JSON} = require('sequelize');
class BooksController {
  async create(req, res, next) {
    try {
      const {issueYear, title, authors, categories, rating} = req.body;
      const {image} = req.files;
      let fileName = uuid.v4() + ".jpg"
      await image.mv(path.resolve(__dirname, '..', 'static', fileName))
      const book =  await BooksType.create({issueYear, title, authors, categories, rating, image: fileName})

      return res.json(book)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }


  }
  async createById(req, res, next) {
    try {
        let { id, title, rating, issueYear, description, publish, pages, cover, weight, format, ISBN, producer, authors, categories, comments} = req.body;
      const {image} = req.files;
      let fileName = uuid.v4() + ".jpg"
      await image.mv(path.resolve(__dirname, '..', 'static', fileName))

      if (comments) {
        // comments = JSON.parse(comments)
        comments.forEach(c =>
          CommentsType.create({
            rating: c.rating,
            text:  c.text,
            createdAt: c.createdAt
          })
        )
      }

      const bookById =  await TBooksByIdType.create({id, issueYear, title, authors, categories, rating, ISBN, cover, format, producer, weight, pages, publish, description,  image: fileName})

      return res.json(bookById)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }


  }

  async gettingAListOfBooks(req, res) {
    const books = await BooksType.findAll()
    return res.json(books)
  }

  async gettingABookById(req, res) {
    const {id} = req.params
    const book = await TBooksByIdType.findOne(
      {
        where: {id},
        include: [{model: CommentsType, as: 'comments'}]
      }
    )
    return res.json(book)
  }
}

module.exports = new BooksController();