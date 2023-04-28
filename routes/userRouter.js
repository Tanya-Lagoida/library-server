const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/local', userController.authorization)
router.post('/local/register', userController.registration)
router.post('/forgot-password', userController.passwordReset)
router.post('/reset-password', userController.passwordRecovery)
router.get('/', authMiddleware, userController.auth)

module.exports = router