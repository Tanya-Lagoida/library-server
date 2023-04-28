const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const booksRouter = require('./booksRouter')
const categoryRouter = require('./categoryRouter')
const commentRouter = require('./commentRouter')
const bookingRouter = require('./bookingRouter')

router.use('/auth', userRouter)
router.use('/books', booksRouter)
router.use('/categories', categoryRouter)
router.use('/bookings', bookingRouter)
router.use('/comments', commentRouter)

module.exports = router