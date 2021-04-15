const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load input validation
const validatePostInput = require('../../validation/post')

// Load User model
const Post = require('../../models/Post')

// @route POST api/users/create
// @desc Register user
// @access Public
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    })

    const savedPost = await newPost.save()

    return res.json(savedPost)
  }
)

module.exports = router
