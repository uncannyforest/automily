const util = require('util')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
import { connectToDatabase } from '../../../util/mongodb'

const genSalt = util.promisify(bcrypt.genSalt)
const hash = util.promisify(bcrypt.hash)

// Load input validation
const validateRegisterInput = require('../../../validation/register')

// Load user model
const User = require('../../../models/User')

// @route POST api/users/register
// @desc Register user
// @access Public
export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  await connectToDatabase()

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
}
