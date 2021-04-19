const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load input validation
const validatePostInput = require('../../validation/post')

// Load User model
const Post = require('../../models/Post')

// @route POST api/posts/create
// @desc Create post
// @access Private
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

// @route GET api/posts/list
// @desc Return all posts
// @access Public
router.get('/list', async (req, res) => {
  const posts = await Post.find({})

  return res.json(posts)
})

// @route GET api/posts/:id
// @desc Get post
// @access Public
router.get('/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  if (!post) {
    return res.status(404).json({ postnotfound: 'Post not found' })
  }

  return res.json(post)
})

module.exports = router
