require('dotenv').config()

let bodyParser = require('body-parser')

const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = 8985

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(bodyParser.json({ 'Content-Type': 'application/json' }))

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use('/js', express.static(__dirname + 'public/js'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.json())

const memberRouter = require('./routes/members')
app.use('/members', memberRouter)

app.listen(PORT, () => console.log(`Running the server on port ${PORT}`))