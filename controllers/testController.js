const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const ApiError = require('../error/apiError')

class TestController {
  async test1(req, res, next) {
    const data = req.body

    //Example middleware errors
    //if (true) {
    //  return next(ApiError.badRequest("Что-то передано не так"))
    //}

    console.log(`This is test1 endpoint, data: ${data}`);

    return res.json({"message": "Endpoint test1 finished sucessfully"})
  }

  async test2(req, res, next) {
    const data = req.body

    console.log(`This is test2 endpoint, data: ${data}`);

    return res.json({"message": "Endpoint test2 finished sucessfully"})
  }
}

module.exports = new TestController()