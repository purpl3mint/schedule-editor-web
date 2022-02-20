const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const ApiError = require('../error/apiError')

class UserController {
  async registration(req, res, next) {
    
    const {username, password, type} = req.body

    if (!username || !password) {
      return next(ApiError.badRequest('Некорректный логин или пароль'))
    }

    const candidate = await User.findOne({where: {username}})

    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      username: username,
      password: hashPassword,
      type: type
    })

    const token = jwt.sign(
      {id: user.id, username: user.username, type: user.type}, 
      process.env.SECRET_KEY, 
      {expiresIn: '24h'})

    return res.json({token})
  }
  
  async login(req, res, next) {
    const {username, password} = req.body

    if (!username)
      return next(ApiError.badRequest('Было передано пустое имя пользователя'))

    if(!password)
      return next(ApiError.badRequest('Был передан пустой пароль'))

    const user = await User.findOne({where: {username}})

    if (!user)
      return next(ApiError.internal('Такого пользователя не существует'))

    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword)
      return next(ApiError.badRequest('Указан неверный пароль'))

    const token = jwt.sign(
      {id: user.id, username: user.username, type: user.type}, 
      process.env.SECRET_KEY, 
      {expiresIn: '24h'})

    return res.json(token)
  }
}

module.exports = new UserController();