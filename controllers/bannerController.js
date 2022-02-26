const {Banner} = require('../models/models')
const ApiError = require('../error/apiError')

class BannerController {
  async create(req, res, next) {
    const {
      name, 
      userId, 
      url, 
      url_reserve, 
      online, 
      background, 
      duration, 
      layout_width, 
      layout_height, 
      layout_gravity
    } = req.body

    if (!url)
      return next(ApiError.badRequest('Некорректный URL баннера'))

    if (!userId)
      return next(ApiError.badRequest('Отсутствует автор баннера'))

    const banner = await Banner.create({
      name, 
      userId, 
      url, 
      url_reserve, 
      online, 
      background, 
      duration, 
      layout_width, 
      layout_height, 
      layout_gravity
    })

    if (banner) {
      return res.json({message: 'Баннер добавлен'})
    } else {
      return next(ApiError.badRequest('Баннер не удалось добавить'))
    }
  }

  async delete(req, res, next) {
    let message = ''
    const {id} = req.params

    const deletedBanner = await Banner.destroy({where: {id}})

    if (deletedBanner) {
      message = 'Баннер успешно удален'
    } else {
      return next(ApiError.badRequest('Баннер не найден, удалить не удалось'))
    }

    return res.json({message})
  }

  async edit(req, res, next) {
    let message = ''
    const {id, 
      online, 
      background, 
      duration, 
      layout_width, 
      layout_height, 
      layout_gravity
    } = req.body

    const banner = await Banner.findByPk(id)

    banner.online = online
    banner.background = background
    banner.duration = duration
    banner.layout_width = layout_width
    banner.layout_height = layout_height
    banner.layout_gravity = layout_gravity

    const isSaved = await banner.save()
  
    if (isSaved){
      message = 'Баннер успешно обновлен'
    } else {
      return next(ApiError.badRequest('Баннер не удалось обновить'))
    }

    return res.json({message})
  }

  async getAll(req, res) {
    const banners = await Banner.findAll()

    return res.json(banners)
  }
}

module.exports = new BannerController()