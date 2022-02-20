const Router = require('express')
const router = new Router()

const bannerRouter = require('./bannerRouter')
const commonContentRouter = require('./commonContentRouter')
const mediaplanRouter = require('./mediaplanRouter')
const tickerRouter = require('./tickerRouter')
const userRouter = require('./userRouter')


router.use('/banner', bannerRouter)
router.use('/commonContent', commonContentRouter)
router.use('/mediaplan', mediaplanRouter)
router.use('/ticker', tickerRouter)
router.use('/user', userRouter)

module.exports = router