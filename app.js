const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { WrongPathError } = require('./errorHelpers/errors')
const { errorHandler } = require('./errorHelpers/apiHelpers')

const authRouter = require('./router/api/authRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)

app.use(() => {
  throw new WrongPathError('This is wrong endpoint')
})
app.use(errorHandler)

module.exports = app
