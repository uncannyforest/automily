const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const keys = require('../../config/keys')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, keys.secretOrKey)
    if (payload) {
      const user = await User.findById(payload.id)
      if (user) {
        req.user = user
        next()
      }
    }
    const error = Error('Bad credentials')
    error.status = 401
    next(error)
  } catch (e) {
    next(e)
  }
}

module.exports = requireToken
