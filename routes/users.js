const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const util = require('util')

const { requireToken, validate } = require('./middleware')
const keys = require('../config/keys')
const User = require('../models/User')
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')

const router = express.Router()

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', validate(validateRegister), async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ email: 'Email already exists' })
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    const hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash

    const savedUser = await newUser.save()

    return res.json(savedUser)
  }
})

// @route POST api/users/login
// @desc Register user
// @access Public
router.post('/login', validate(validateLogin), async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // Find user by email
  const user = await User.findOne({ email })

  // Check if user exists
  if (!user) {
    return res.status(404).json({ emailnotfound: 'Email not found' })
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    const userObj = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    // Sign token
    const token = jwt.sign(userObj, keys.secretOrKey, {
      expiresIn: 31556926, // 1 year in seconds
    })

    return res.json({
      success: true,
      token: token,
      user: userObj,
    })
  } else {
    return res.status(400).json({ passwordincorrect: 'Password incorrect' })
  }
})

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get('/currentuser', requireToken, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  })
})

module.exports = router
