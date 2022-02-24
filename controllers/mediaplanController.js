const {Mediaplan, BannerInMediaplan, Ads } = require('../models/models')

class MediaplanController {
  async create(req, res) {
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
      return res.json({message: 'Нет основного контента'})
    }
    if (!userId) {
      return res.json({message: 'Нет автора'})
    }

    const mediaplan = await Mediaplan.create({
      name,
      userId,
      ads_start_delay, 
      banners_start_delay, 
      banners_repeat, 
      banners_animation_duration_msec, 
      contentId
    })

    if (mediaplan) {
      return res.json({message: 'Медиаплан успешно создан'})
    } else {
      return res.json({message: 'Медиаплан не удалось создать'})
    }
  }

  async delete(req, res) {
    const {id} = req.params

    const deletedMediaplan = await Mediaplan.destroy({where: {id}})

    if (deletedMediaplan) {
      message = 'Медиаплан успешно удален'
    } else {
      message = 'Медиаплан не найден, удалить не удалось'
    }

    return res.json({message})
  }

  async setParameters(req, res) {
    const {
      id,
      ads_start_delay, 
      banners_start_delay, 
      banners_repeat, 
      banners_animation_duration_msec, 
      contentId
    } = req.body

    const mediaplan = await Mediaplan.findByPk(id)

    if (!mediaplan)
      return res.json({message: 'Не удалось найти медиаплан'})

    mediaplan.ads_start_delay = ads_start_delay
    mediaplan.banners_start_delay = banners_start_delay
    mediaplan.banners_repeat = banners_repeat
    mediaplan.banners_animation_duration_msec = banners_animation_duration_msec
    mediaplan.contentId = contentId

    const isSaved = await mediaplan.save()

    if (isSaved) {
      return res.json({message: 'Медиаплан успешно изменен'})
    } else {
      return res.json({message: 'Медиаплан не удалось изменить'})
    }
  }

  async addBanner(req, res) {
    const {mediaplanId, bannerId, position} = req.body

    const addedBanner = await BannerInMediaplan.create({
      position,
      bannerId,
      mediaplanId
    })

    return res.json(addedBanner)
  }

  async editOrderBanners(req, res) {
    const {id, position} = req.body
    const ad = await BannerInMediaplan.findByPk(id)
    const candidate = await BannerInMediaplan.find({where: {position}})
    let result


    if (!candidate){
      ad.position = position
      result = await ad.save()
      if (!result)
        return res.json({message: 'Не удалось сменить порядок воспроизведения. Баннер не сохранен'})
      return res.json({message: 'Порядок воспроизведения баннеров успешно изменен'})
    }


    candidate.position = ad.position
    ad.position = position

    result = await candidate.save()
    if (!result)
      return res.json({message: 'Не удалось сменить порядок воспроизведения. Кандидат не сохранен'})
    
    result = await ad.save()
    if (!result)
      return res.json({message: 'Не удалось сменить порядок воспроизведения. Баннер не сохранен'})

      return res.json({message: 'Порядок воспроизведения баннеров успешно изменен'})
  }

  async deleteBanner(req, res) {
    const {id} = req.params

    const result = await BannerInMediaplan.destroy({where: {id}})

    if (result) {
      return res.json({message: 'Баннер был удален'})
    } else {
      return res.json({message: 'Баннер не удалось удалить'})
    }
  }

  async deleteAllBanners(req, res) {
    const {id} = req.params

    const result = await BannerInMediaplan.destroy({
      where: {
        mediaplanId: id
      }
    })

    if (result) {
      return res.json({message: 'Баннеры были удалены'})
    } else {
      return res.json({message: 'Баннеры не удалось удалить'})
    }
  }

  async setTicker(req, res) {
    const {mediaplanId, tickerId} = req.body

    const mediaplan = await Mediaplan.findByPk(mediaplanId)

    mediaplan.tickerId = tickerId

    const isSaved = await mediaplan.save()

    if (isSaved) {
      return res.json({message: 'Бегущая строка успешно добавлена'})
    } else {
      return res.json({message: 'Бегущую строку не удалось добавить'})
    }
  }

  async unsetTicker(req, res) {
    const {id} = req.body

    const mediaplan = await Mediaplan.findByPk(id)
    mediaplan.tickerId = 0;

    const isSaved = mediaplan.save()

    if (isSaved) {
      return res.json({message: 'Бегущая строка удалена из медиаплана'})
    } else {
      return res.json({message: 'Бегущую строку не удалось удалить из медиаплана'})
    }
  }

  async setAds(req, res) {
    const {mediaplanId, contentId, position} = req.body

    const addedAds = await Ads.create({
      position,
      contentId,
      mediaplanId
    })

    return res.json(addedAds)
  }

  async editOrderAds(req, res) {
    const {id, position} = req.body
    const ad = await Ads.findByPk(id)
    const candidate = await Ads.find({where: {position}})
    let result


    if (!candidate){
      ad.position = position
      result = await ad.save()
      if (!result)
        return res.json({message: 'Не удалось сменить порядок воспроизведения. Контент не сохранен'})
      return res.json({message: 'Порядок воспроизведения контента успешно изменен'})
    }


    candidate.position = ad.position
    ad.position = position

    result = await candidate.save()
    if (!result)
      return res.json({message: 'Не удалось сменить порядок воспроизведения. Кандидат не сохранен'})
    
    result = await ad.save()
    if (!result)
      return res.json({message: 'Не удалось сменить порядок воспроизведения. Контент не сохранен'})

      return res.json({message: 'Порядок воспроизведения контента успешно изменен'})
  }

  async deleteAds(req, res) {
    const {id} = req.params

    const result = await Ads.destroy({where: {id}})

    if (result) {
      return res.json({message: 'Дополнительный контент был удален'})
    } else {
      return res.json({message: 'Дополнительный контент не удалось удалить'})
    }
  }

  async deleteAllAds(req, res) {
    const {id} = req.params

    const result = await Ads.destroy({
      where: {
        mediaplanId: id
      }
    })

    if (result) {
      return res.json({message: 'Весь дополнительный контент был удален'})
    } else {
      return res.json({message: 'Весь дополнительный контент не удалось удалить'})
    }
  }
}

module.exports = new MediaplanController()