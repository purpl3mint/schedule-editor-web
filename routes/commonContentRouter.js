const Router = require('express')
const router = new Router()
const commonContentController = require('../controllers/commonContentController')

router.post('/', commonContentController.create)
router.put('/', commonContentController.edit)
router.delete('/:id', commonContentController.delete)

module.exports = router