const Router = require('express')
const router = new Router()
const tickerController = require('../controllers/tickerController')

router.post('/', tickerController.create)
router.put('/', tickerController.edit)
router.delete('/:id', tickerController.delete)
router.get('/', tickerController.getAll)

module.exports = router