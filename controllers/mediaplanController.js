const {Mediaplan, BannerInMediaplan, Ads, Banner, CommonContent, Ticker } = require('../models/models')
const ApiError = require('../error/apiError')

class MediaplanController {
  async create(req, res, next) {
    const {
      name,
      userId,
      ads_start_delay, 
      banners_start_delay, 
      banners_repeat, 
      banners_animation_duration_msec, 
      contentId
    } = req.body

    if (!contentId) {
      return next(ApiError.badRequest('Нет основного контента'))
    }
    if (!userId) {
      return next(ApiError.badRequest('Нет автора'))
    }

    const candidate = await Mediaplan.findOne({where: {name}})
    if (candidate) {
      return next(ApiError.badRequest('Медиаплан с таким названием уже существует'))
    }

    const mediaplan = await Mediaplan.create({
      name,
      userId,
      ads_start_delay, 
      banners_start_delay, 
      banners_repeat, 
      banners_animation_duration_msec, 
      commonContentId: contentId
    })

    if (mediaplan) {
      return res.json({message: 'Медиаплан успешно создан'})
    } else {
      return next(ApiError.badRequest('Медиаплан не удалось создать'))
    }
  }

  async delete(req, res, next) {
    let message = ''
    const {id} = req.params

    const deletedMediaplan = await Mediaplan.destroy({where: {id}})

    if (deletedMediaplan) {
      message = 'Медиаплан успешно удален'
    } else {
      return next(ApiError.badRequest('Медиаплан не найден, удалить не удалось'))
    }

    return res.json({message})
  }

  async setParameters(req, res, next) {
    const {
      id,
      ads_start_delay, 
      banners_start_delay, 
      banners_repeat, 
      banners_animation_duration_msec, 
      commonContentId
    } = req.body

    const mediaplan = await Mediaplan.findByPk(id)

    if (!mediaplan)
      return next(ApiError.badRequest('Не удалось найти медиаплан'))

    mediaplan.ads_start_delay = ads_start_delay
    mediaplan.banners_start_delay = banners_start_delay
    mediaplan.banners_repeat = banners_repeat
    mediaplan.banners_animation_duration_msec = banners_animation_duration_msec
    mediaplan.commonContentId = commonContentId

    const isSaved = await mediaplan.save()

    if (isSaved) {
      return res.json({message: 'Медиаплан успешно изменен'})
    } else {
      return next(ApiError.badRequest('Медиаплан не удалось изменить'))
    }
  }

  async addBanner(req, res, next) {
    const {mediaplanId, bannerId, position} = req.body

    const mediaplan = await Mediaplan.findByPk(mediaplanId)
    const banner = await Banner.findByPk(bannerId)

    if (!mediaplan)
      return next(ApiError.badRequest('Такого медиаплана не существует'))

    if (!banner)
      return next(ApiError.badRequest('Такого баннера не существует'))

    const candidate = await BannerInMediaplan.findOne({where: {
      mediaplanId: mediaplanId,
      bannerId: bannerId
    }})

    if (candidate)
      return next(ApiError.badRequest('Такая запись уже существует'))

    const addedBanner = await BannerInMediaplan.create({
      position: position,
      bannerId: bannerId,
      mediaplanId: mediaplanId
    }).catch(err => console.error(err))

    if (addedBanner) {
      return res.json({message: 'Баннер успешно добавлен в медиаплан'})
    } else {
      return next(ApiError.badRequest('Баннер не удалось добавить в медиаплан'))
    }
  }

  async editOrderBanners(req, res, next) {
    const {id, position} = req.body
    const ad = await BannerInMediaplan.findByPk(id)
    const candidate = await BannerInMediaplan.findOne({where: {position}})
    let result


    if (!candidate){
      ad.position = position
      result = await ad.save()
      if (!result)
        return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Баннер не сохранен'))
      return res.json({message: 'Порядок воспроизведения баннеров успешно изменен'})
    }


    candidate.position = ad.position
    ad.position = position

    result = await candidate.save()
    if (!result)
      return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Кандидат не сохранен'))
    
    result = await ad.save()
    if (!result)
      return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Баннер не сохранен'))
    return res.json({message: 'Порядок воспроизведения баннеров успешно изменен'})
  }

  async deleteBanner(req, res, next) {
    const {id} = req.params

    const result = await BannerInMediaplan.destroy({where: {id}})

    if (result) {
      return res.json({message: 'Баннер был удален'})
    } else {
      return next(ApiError.badRequest('Баннер не удалось удалить'))
    }
  }

  async deleteAllBanners(req, res, next) {
    const {id} = req.params

    const result = await BannerInMediaplan.destroy({
      where: {
        mediaplanId: id
      }
    })

    if (result) {
      return res.json({message: 'Баннеры были удалены'})
    } else {
      return next(ApiError.badRequest('Баннеры не удалось удалить'))
    }
  }

  async setTicker(req, res, next) {
    const {mediaplanId, tickerId} = req.body

    let changingMediaplan = await Mediaplan.findByPk(mediaplanId)

    changingMediaplan.tickerId = tickerId

    const isSaved = await changingMediaplan.save().catch(err => console.error(err))

    if (isSaved) {
      return res.json({message: 'Бегущая строка успешно добавлена'})
    } else {
      return next(ApiError.badRequest('Бегущую строку не удалось добавить'))
    }
  }

  async unsetTicker(req, res, next) {
    const {id} = req.params

    const mediaplan = await Mediaplan.findByPk(id)
    mediaplan.tickerId = 0;

    const isSaved = mediaplan.save()

    if (isSaved) {
      return res.json({message: 'Бегущая строка удалена из медиаплана'})
    } else {
      return next(ApiError.badRequest('Бегущую строку не удалось удалить из медиаплана'))
    }
  }

  async setAds(req, res, next) {
    const {mediaplanId, contentId, position} = req.body

    const mediaplan = await Mediaplan.findByPk(mediaplanId)
    const content = await CommonContent.findByPk(contentId)

    if (!mediaplan)
      return next(ApiError.badRequest('Такого медиаплана не существует'))

    if (!content)
      return next(ApiError.badRequest('Такого контента не существует'))

    const candidate = await Ads.findOne({where: {
      contentId,
      mediaplanId,
      position
    }})

    if (candidate) 
      return res.json({message: "Контент уже добавлен"})

    const addedAds = await Ads.create({
      position,
      contentId,
      mediaplanId
    }).catch(err => console.error(err))

    if (addedAds)
      return res.json({message: "Контент успешно добавлен в медиаплан"})
    return next(ApiError.badRequest('Контент не удалось добавить в медиаплан'))
  }

  async editOrderAds(req, res, next) {
    const {id, position} = req.body
    const ad = await Ads.findByPk(id)
    const candidate = await Ads.findOne({where: {position}})
    let result


    if (!candidate){
      ad.position = position
      result = await ad.save()
      if (!result)
        return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Контент не сохранен'))
      return res.json({message: 'Порядок воспроизведения контента успешно изменен'})
    }


    candidate.position = ad.position
    ad.position = position

    result = await candidate.save()
    if (!result)
      return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Кандидат не сохранен'))
    
    result = await ad.save()
    if (!result)
      return next(ApiError.badRequest('Не удалось сменить порядок воспроизведения. Контент не сохранен'))
    return res.json({message: 'Порядок воспроизведения контента успешно изменен'})
  }

  async deleteAds(req, res, next) {
    const {id} = req.params

    const result = await Ads.destroy({where: {id}})

    if (result) {
      return res.json({message: 'Дополнительный контент был удален'})
    } else {
      return next(ApiError.badRequest('Дополнительный контент не удалось удалить'))
    }
  }

  async deleteAllAds(req, res, next) {
    const {id} = req.params

    const result = await Ads.destroy({
      where: {
        mediaplanId: id
      }
    })

    if (result) {
      return res.json({message: 'Весь дополнительный контент был удален'})
    } else {
      return next(ApiError.badRequest('Весь дополнительный контент не удалось удалить'))
    }
  }

  async getAll(req, res, next) {
    const mediaplans = await Mediaplan.findAll({
      include: [{
        model: CommonContent,
      }, {
        model: Banner,
        as: 'MediaplanBanner'
      }, {
        model: Ticker
      }, {
        model: CommonContent, 
        as: 'MediaplanContent'
      }]
    })

    return res.json(mediaplans)
  }

  async getById(req, res, next) {
    const {id} = req.params
    const mediaplan = await Mediaplan.findByPk(id, {
      include: [{
        model: CommonContent,
      }, {
        model: Banner,
        as: 'MediaplanBanner'
      }, {
        model: Ticker
      }, {
        model: CommonContent, 
        as: 'MediaplanContent'
      }]
    })

    return res.json(mediaplan)
  }
}

module.exports = new MediaplanController()