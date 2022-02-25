const Router = require('express')
const router = new Router()
const mediaplanController = require('../controllers/mediaplanController')

router.post('/', mediaplanController.create)
router.put('/', mediaplanController.setParameters)
router.delete('/:id', mediaplanController.delete)

router.post('/banner', mediaplanController.addBanner)
router.delete('/banner/:id', mediaplanController.deleteBanner)
router.delete('/bannerall/:id', mediaplanController.deleteAllBanners)
router.put('/bannerorder', mediaplanController.editOrderBanners)

router.post('/ticker', mediaplanController.setTicker)
router.delete('/ticker/:id', mediaplanController.unsetTicker)

router.post('/content', mediaplanController.setAds)
router.put('/contentorder', mediaplanController.editOrderAds)
router.delete('/content/:id', mediaplanController.deleteAds)
router.delete('/contentall/:id', mediaplanController.deleteAds)

router.get('/', mediaplanController.getAll)

module.exports = router