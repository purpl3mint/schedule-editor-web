const Router = require('express')
const router = new Router()
const bannerController = require('../controllers/bannerController')

router.post('/', bannerController.create)
router.put('/', bannerController.edit)
router.delete('/:id', bannerController.delete)
router.get('/', bannerController.getAll)

module.exports = router