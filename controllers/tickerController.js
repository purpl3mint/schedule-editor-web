const {Ticker} = require('../models/models')
const ApiError = require('../error/apiError')

class TickerController {
  async create(req, res) {
    const {name, author_id, url, size, speed, font_color, background_color} = req.body

    if (!url)
      return next(ApiError.badRequest('Некорректный URL бегущей строки'))

    if (!author_id)
      return next(ApiError.badRequest('Отсутствует автор бегущей строки'))

    const ticker = await Ticker.create({
      name, author_id, url, size, speed, font_color, background_color
    })

    if (ticker) {
      return res.json({message: 'Бегущая строка добавлена'})
    } else {
      return res.json({message: 'Бегущую строку не удалось добавить'})
    }
  }

  async delete(req, res) {
    let message = ''
    const {id} = req.params

    const deletedTicker = await Ticker.destroy({where: {id}})

    if (deletedTicker) {
      message = 'Бегущая строка успешно удалена'
    } else {
      message = 'Бегущая строка не найдена, удалить не удалось'
    }

    return res.json({message})
  }

  async edit(req, res) {
    let message = ''
    const {id, size, speed, font_color, background_color} = req.body

    const ticker = await Ticker.findByPk(id)

    ticker.size = size
    ticker.speed = speed
    ticker.font_color = font_color
    ticker.background_color = background_color

    const isSaved = await ticker.save()
  
    if (isSaved){
      message = 'Бегущая строка успешно обновлена'
    } else {
      message = 'Бегущую строку не удалось обновить'
    }

    return res.json({message})
  }
}

module.exports = new TickerController()