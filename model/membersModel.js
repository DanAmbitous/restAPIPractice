const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String
})

module.exports = mongoose.model('Member', memberSchema)