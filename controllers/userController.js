const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {User} = require('../models/models');

const generateJwt = (id, email, username, firstName, lastName, phone) => {
  return jwt.sign(
    {id, email, username, firstName, lastName, phone},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, username, password, firstName, lastName, phone} = req.body;
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, username, password: hashPassword, firstName, lastName, phone})
    const token = generateJwt(user.id, user.email, user.firstName, user.lastName, user.phone)
    return res.json({token, user})
  }

  async authorization(req, res, next) {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.firstName, user.lastName, user.phone)
    return res.json({token, user})
  }

  async passwordReset(req, res) {

  }

  async passwordRecovery(req, res) {

  }

  async auth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.firstName, req.user.lastName, req.user.phone)
    return res.json({token})
    // res.json({message: "All right"})

  }
}

module.exports = new UserController();