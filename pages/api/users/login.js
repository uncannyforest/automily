const util = require('util')
const bcrypt = require('bcryptjs')
const keys = require('../../../config/keys')
const mongoose = require('mongoose')
import { connectToDatabase } from '../../../util/mongodb'

const sign = util.promisify(require('jsonwebtoken').sign)

// Load input validation
const validateLoginInput = require('../../../validation/login')

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
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  await connectToDatabase()

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
}
