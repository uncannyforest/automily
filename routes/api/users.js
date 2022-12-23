const express = require('express')
const router = express.Router()
const util = require('util')
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')

const genSalt = util.promisify(bcrypt.genSalt)
const hash = util.promisify(bcrypt.hash)
const sign = util.promisify(require('jsonwebtoken').sign)

const requireToken = require('./requireToken')
// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ email: 'Email already exists' })
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    // Hash password before saving in database
    const salt = await genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash

    const savedUser = await newUser.save()

    return res.json(savedUser)
  }
})

// @route POST api/users/login
// @desc Register user
// @access Public
router.post('/login', async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

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
    // User matched
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
    }
    // Sign token
    const token = await sign(payload, keys.secretOrKey, {
      expiresIn: 31556926, // 1 year in seconds
    })

    return res.json({
      success: true,
      token: 'Bearer ' + token,
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
