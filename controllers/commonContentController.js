const {CommonContent} = require('../models/models')
const ApiError = require('../error/apiError')

class CommonContentController {
  async create(req, res, next) {
    const {name, userId, url, online, aspect_ratio, duration} = req.body

    if (!url)
      return next(ApiError.badRequest('Некорректный URL контента'))

    if (!userId)
      return next(ApiError.badRequest('Отсутствует автор контента'))

    const content = await CommonContent.create({
      name, userId, url, online, aspect_ratio, duration
    })

    if (content) {
      return res.json({message: 'Контент добавлен'})
    } else {
      return res.json({message: 'Контент не удалось добавить'})
    }
  }

  async delete(req, res) {
    let message = ''
    const {id} = req.params

    const deletedContent = await CommonContent.destroy({where: {id}})

    if (deletedContent) {
      message = 'Контент успешно удален'
    } else {
      message = 'Контент не найден, удалить не удалось'
    }

    return res.json({message})
  }

  async edit(req, res) {
    let message = ''
    const {id, online, aspect_ratio, duration} = req.body

    const content = await CommonContent.findByPk(id)

    content.online = online
    content.aspect_ratio = aspect_ratio
    content.duration = duration

    const isSaved = await content.save()
  
    if (isSaved){
      message = 'Контент успешно обновлен'
    } else {
      message = 'Контент не удалось обновить'
    }

    return res.json({message})
  }

  async getAll(req, res) {
    const contents = await CommonContent.findAll()

    return res.json(contents)
  }
}

module.exports = new CommonContentController()