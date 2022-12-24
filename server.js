const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

const db = require('./config/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err))

mongoose.set('debug', true)
mongoose.set('strictQuery', true)

app.use('/api', require('./routes'))

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})

const port = process.env.PORT || 5000 // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
