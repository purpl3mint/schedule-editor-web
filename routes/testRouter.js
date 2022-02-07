const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')
//const authMiddleware = require('../middleware/authMiddleware')

router.post('/test1', testController.test1)
router.post('/test2', testController.test2)

module.exports = router