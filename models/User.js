const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('debug', true)

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = User =
  mongoose.models.users || mongoose.model('users', UserSchema)
