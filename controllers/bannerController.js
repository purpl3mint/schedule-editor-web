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
      return res.json({message: 'Баннер не удалось добавить'})
    }
  }

  async delete(req, res) {
    let message = ''
    const {id} = req.params

    const deletedBanner = await Banner.destroy({where: {id}})

    if (deletedBanner) {
      message = 'Баннер успешно удален'
    } else {
      message = 'Баннер не найден, удалить не удалось'
    }

    return res.json({message})
  }

  async edit(req, res) {
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
      message = 'Баннер не удалось обновить'
    }

    return res.json({message})
  }
}

module.exports = new BannerController()