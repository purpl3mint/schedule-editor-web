const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.put('/setpassword', userController.setPassword)
router.get('/', userController.getAll)
router.delete('/:id', userController.deleteUser)

module.exports = router