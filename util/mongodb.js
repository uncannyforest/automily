const mongoose = require('mongoose')

let uri = process.env.MONGODB_URI

let connected = false

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (connected) {
    return
  }

  mongoose.set('debug', true)

  await mongoose.connect(uri, { useNewUrlParser: true })

  console.log('Mongoose successfully connected to database')

  connected = true
}
