const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const db = require('./config/keys').mongoURI

const app = express()

app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

app.use('/api', require('./routes'))

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})

app.use('*', (err, req, res, next) => {
  console.log(err)
  res.status(500).send('Internal error :(')
})

const startUp = async () => {
  try {
    mongoose.set('debug', true)
    mongoose.set('strictQuery', true)
    await mongoose.connect(db, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 2000,
    })
    console.log('MongoDB successfully connected')

    const port = process.env.PORT || 5000

    app.listen(port, () =>
      console.log(`Server up and running on port ${port} !`)
    )
  } catch (e) {
    console.log(e)
  }
}

startUp()
