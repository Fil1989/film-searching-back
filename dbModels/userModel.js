const mongoose = require('mongoose')
const { UserDuplicateError } = require('../errorHelpers/errors')

const filmsUserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [
      true,
      () => {
        throw new UserDuplicateError('email dublication')
      },
    ],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  token: String,
})
const FilmsUser = mongoose.model('filmsuser', filmsUserSchema)

module.exports = { FilmsUser }
