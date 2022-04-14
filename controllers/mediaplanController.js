const {Mediaplan, BannerInMediaplan, Ads, Banner, CommonContent, Ticker } = require('../models/models')
const ApiError = require('../error/apiError')
const fs = require('fs')
const path = require('path')

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
      /*
      fs.writeFile(path.resolve(__dirname, '..', mediaplan.name, '.json'), JSON.stringify(mediaplan), function(err) {
        if (err) {
          console.log("Файл не удалось создать");
        }
      })
      */
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

    const allMediaplanCandidates = await BannerInMediaplan.findAll({where: {
      mediaplanId
    }})
    const candidateById = allMediaplanCandidates.find(item => item.bannerId === bannerId - 0)
    const candidateByPosition = allMediaplanCandidates.find(item => item.position.find(pos => pos === position - 0))

    if (candidateByPosition) 
    {
      return next(ApiError.forbidden("Не удалось добавить баннер: позиция уже занята"))
    } else if (candidateById)
    {
      const newPositions = candidateById.position.concat(position - 0)
      candidateById.position = newPositions

      const savingResult = await candidateById.save().catch(err => console.error(err))

      if (savingResult)
      {
        return res.json({message: "Баннер успешно добавлен"})
      } 
      return next(ApiError.badRequest('Баннер не удалось добавить в медиаплан'))
    } else
    {
      const newPositionArray = []
      newPositionArray.push(position)
      const addedBanner = await BannerInMediaplan.create({
        position: newPositionArray,
        bannerId,
        mediaplanId
      }).catch(err => console.error(err))

      if (addedBanner)
        return res.json({message: "Баннер успешно добавлен в медиаплан"})
      return next(ApiError.badRequest('Баннер не удалось добавить в медиаплан'))
    }
  }

  async setListBanner(req, res, next) {
    const {mediaplanId, bannersList} = req.body

    const resultOfDestroying = await BannerInMediaplan.destroy({where: {mediaplanId}})

    if (true) {
      for(let i = 0; i < bannersList.length; i++) {

        const candidate = await BannerInMediaplan.findOne({where: {
          mediaplanId,
          bannerId: bannersList[i]
        }})
        
        if (candidate) {
          const newPositions = candidate.position.concat(i)
          candidate.position = newPositions

          const savingResult = await candidate.save().catch(err => console.error(err))

          if (!savingResult) {
            return next(ApiError.badRequest("Не удалось добавить список баннеров в медиаплан"))
          }
        } else {
          const newPositionArray = []
          newPositionArray.push(i)
          const addedBanner = await BannerInMediaplan.create({
            position: newPositionArray,
            bannerId: bannersList[i],
            mediaplanId
          }).catch(err => console.error(err))
    
          if (!addedBanner)
            return next(ApiError.badRequest('Не удалось добавить список баннеров в медиаплан'))
        }
        
      }

      return res.json({message: "Список баннеров успешно добавлен"})
    } else {
      return next(ApiError.badRequest("Не удалось соранить новый список баннеров"))
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
    const {id, position} = req.params

    const candidate = await BannerInMediaplan.findByPk(id)

    if (candidate.position.length === 1 && candidate.position[0] === position - 0)
    {
      const result = await BannerInMediaplan.destroy({where: {id}})

      if (result) {
        const bannerInMediaplan = await BannerInMediaplan.findAll({where: {mediaplanId: candidate.mediaplanId}})

        for(let i = 0; i < bannerInMediaplan.length; i++)
        {
          const indexOfPosition = bannerInMediaplan[i].position.indexOf(position - 0)
          
          if (indexOfPosition !== -1)
          {
            bannerInMediaplan[i].position.splice(indexOfPosition, 1)
          }
          
          const transformedPositions = bannerInMediaplan[i].position.map(pos => {
            if (pos > position - 0)
              return pos - 1
            else if (pos < position - 0)
              return pos
          })

          bannerInMediaplan[i].position = transformedPositions
        }

        for(let i = 0; i < bannerInMediaplan.length; i++)
        {
          const result = await bannerInMediaplan[i].save()

          if (!result)
          {
            return next(ApiError.badRequest("Не удалось удалить контент"))
          }
        }

        return res.json({message: "Контент успешно удален"})
      } else {
        return next(ApiError.badRequest('Контент не удалось удалить'))
      }
    } else if (candidate.position.length === 1 && candidate.position[0] !== position - 0)
    {
      return next(ApiError.badRequest("Такого дополнительного контента не найдено"))
    } else 
    {
      const newPosition = candidate.position.filter(item => item !== position - 0)

      candidate.position = newPosition
      const savingCandidate = await candidate.save()
      
      if (savingCandidate)
      {
        const bannerInMediaplan = await BannerInMediaplan.findAll({where: {mediaplanId: candidate.mediaplanId}})

        for(let i = 0; i < bannerInMediaplan.length; i++)
        {
          const indexOfPosition = bannerInMediaplan[i].position.indexOf(position - 0)
          
          if (indexOfPosition !== -1)
          {
            bannerInMediaplan[i].position.splice(indexOfPosition, 1)
          }
          
          const transformedPositions = bannerInMediaplan[i].position.map(pos => {
            if (pos > position - 0)
              return pos - 1
            else if (pos < position - 0)
              return pos
          })

          bannerInMediaplan[i].position = transformedPositions
        }

        for(let i = 0; i < bannerInMediaplan.length; i++)
        {
          const result = await bannerInMediaplan[i].save()

          if (!result)
          {
            return next(ApiError.badRequest("Не удалось удалить контент"))
          }
        }

        return res.json({message: "Контент успешно удален"})
      } else {
        return next(ApiError.badRequest("Не удалось удалить контент"))
      }
    }
    /*
    const {id} = req.params

    const result = await BannerInMediaplan.destroy({where: {id}})

    if (result) {
      return res.json({message: 'Баннер был удален'})
    } else {
      return next(ApiError.badRequest('Баннер не удалось удалить'))
    }
    */
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

    console.log("Mediaplan: ", mediaplan);

    mediaplan.tickerId = null;
    
    let isSaved
    try {
      isSaved = await mediaplan.save()
    } catch (e) {
      console.log(e);
    }
    //const isSaved = await mediaplan.save()

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

    const allMediaplanCandidates = await Ads.findAll({where: {
      mediaplanId
    }})
    const candidateById = allMediaplanCandidates.find(item => item.contentId === contentId - 0)
    const candidateByPosition = allMediaplanCandidates.find(item => item.position.find(pos => pos === position - 0))

    if (candidateByPosition) 
    {
      return next(ApiError.forbidden("Не удалось добавить контент: позиция уже занята"))
    } else if (candidateById)
    {
      const newPositions = candidateById.position.concat(position - 0)
      candidateById.position = newPositions

      const savingResult = await candidateById.save().catch(err => console.error(err))

      if (savingResult)
      {
        return res.json({message: "Контент успешно добавлен"})
      } 
      return next(ApiError.badRequest('Контент не удалось добавить в медиаплан'))
    } else
    {
      const newPositionArray = []
      newPositionArray.push(position)
      const addedAds = await Ads.create({
        position: newPositionArray,
        contentId,
        mediaplanId
      }).catch(err => console.error(err))

      if (addedAds)
        return res.json({message: "Контент успешно добавлен в медиаплан"})
      return next(ApiError.badRequest('Контент не удалось добавить в медиаплан'))
    }
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
    const {id, position} = req.params

    const candidate = await Ads.findByPk(id)

    if (candidate.position.length === 1 && candidate.position[0] === position - 0)
    {
      const result = await Ads.destroy({where: {id}})

      if (result) {
        const adsInMediaplan = await Ads.findAll({where: {mediaplanId: candidate.mediaplanId}})

        for(let i = 0; i < adsInMediaplan.length; i++)
        {
          const indexOfPosition = adsInMediaplan[i].position.indexOf(position - 0)
          
          if (indexOfPosition !== -1)
          {
            adsInMediaplan[i].position.splice(indexOfPosition, 1)
          }
          
          const transformedPositions = adsInMediaplan[i].position.map(pos => {
            if (pos > position - 0)
              return pos - 1
            else if (pos < position - 0)
              return pos
          })

          adsInMediaplan[i].position = transformedPositions
        }

        for(let i = 0; i < adsInMediaplan.length; i++)
        {
          const result = await adsInMediaplan[i].save()

          if (!result)
          {
            return next(ApiError.badRequest("Не удалось удалить контент"))
          }
        }

        return res.json({message: "Контент успешно удален"})
      } else {
        return next(ApiError.badRequest('Контент не удалось удалить'))
      }
    } else if (candidate.position.length === 1 && candidate.position[0] !== position - 0)
    {
      return next(ApiError.badRequest("Такого дополнительного контента не найдено"))
    } else 
    {
      const newPosition = candidate.position.filter(item => item !== position - 0)

      candidate.position = newPosition
      const savingCandidate = await candidate.save()
      
      if (savingCandidate)
      {
        const adsInMediaplan = await Ads.findAll({where: {mediaplanId: candidate.mediaplanId}})

        for(let i = 0; i < adsInMediaplan.length; i++)
        {
          const indexOfPosition = adsInMediaplan[i].position.indexOf(position - 0)
          
          if (indexOfPosition !== -1)
          {
            adsInMediaplan[i].position.splice(indexOfPosition, 1)
          }
          
          const transformedPositions = adsInMediaplan[i].position.map(pos => {
            if (pos > position - 0)
              return pos - 1
            else if (pos < position - 0)
              return pos
          })

          adsInMediaplan[i].position = transformedPositions
        }

        for(let i = 0; i < adsInMediaplan.length; i++)
        {
          const result = await adsInMediaplan[i].save()

          if (!result)
          {
            return next(ApiError.badRequest("Не удалось удалить контент"))
          }
        }

        return res.json({message: "Контент успешно удален"})
      } else {
        return next(ApiError.badRequest("Не удалось удалить контент"))
      }
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

  async setContentAndAdsByList(req, res, next) {
    const {mediaplanId, contentsList} = req.body

    console.log(mediaplanId)
    console.log(contentsList)

    if (contentsList.length === 0)
      return next(ApiError.badRequest('Список контента пуст'))

    const resultOfDestroying = await Ads.destroy({where: {mediaplanId}}).catch(err => console.log(err))

    const mediaplan = await Mediaplan.findByPk(mediaplanId).catch(err => console.log(err))
    
    if (!mediaplan)
      return next(ApiError.badRequest('Не удалось найти медиаплан'))

    mediaplan.commonContentId = contentsList[0]

    const resultOfSavingCommonContent = await mediaplan.save().catch(err => console.log(err))

    for (let i = 1; i < contentsList.length; i++) {
      const candidate = await Ads.findOne({where: {
        mediaplanId,
        contentId: contentsList[i]
      }}).catch(err => console.log(err))

      if (candidate) {
        const newPositions = candidate.position.concat(i)
        candidate.position = newPositions

        const savingResult = await candidate.save().catch(err => console.error(err))

        if (!savingResult) {
          return next(ApiError.badRequest("Не удалось добавить список контента в медиаплан"))
        }
      } else {
        const newPositionArray = []
        newPositionArray.push(i)
        const addedBanner = await Ads.create({
          position: newPositionArray,
          contentId: contentsList[i],
          mediaplanId
        }).catch(err => console.error(err))
  
        if (!addedBanner)
          return next(ApiError.badRequest('Не удалось добавить список контента в медиаплан'))
      }
    }

    return res.json({message: "Список контента успешно добавлен в медиаплан"})
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