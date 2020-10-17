import { MongoClient } from 'mongodb'

const mongoose = require('mongoose')

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

async function newMongoDBConnection() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = await client.db(dbName)

  console.log('MongoDB successfully connected')

  return [client, db]
}

async function newMongooseConnection() {
  await mongoose.connect(uri, { useNewUrlParser: true })

  console.log('Mongoose successfully connected to database')
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  mongoose.set('debug', true)

  const [[client, db], unused] = await Promise.all([
    newMongoDBConnection(),
    newMongooseConnection(),
  ])

  cachedClient = client
  cachedDb = db

  return { client, db }
}
