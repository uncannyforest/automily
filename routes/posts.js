const express = require('express')
const router = express.Router()

const { requireToken, validate } = require('./middleware')
// Load input validation
const validatePost = require('../validation/post')

// Load User model
const Post = require('../models/Post')

// @route POST api/posts/create
// @desc Create post
// @access Private
router.post(
  '/create',
  requireToken,
  validate(validatePost),
  async (req, res) => {
    try {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
      })

      const savedPost = await newPost.save()

      return res.json(savedPost)
    } catch (e) {
      next(e)
    }
  }
)

// @route GET api/posts/list
// @desc Return all posts
// @access Public
router.get('/list', async (req, res) => {
  try {
    const posts = await Post.find({})

    return res.json(posts)
  } catch (e) {
    next(e)
  }
})

// @route GET api/posts/:id
// @desc Get post
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    if (!post) {
      return res.status(404).json({ postnotfound: 'Post not found' })
    }

    return res.json(post)
  } catch (e) {
    next(e)
  }
})

module.exports = router
