const Joi = require('joi')

const validateUser = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required().max(50),
    name: Joi.string().required().min(3).max(30),
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    await res.status(400).json({ message: validationResult.error.message })
    return
  }
  next()
}
const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required().max(50),
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    await res.status(400).json({ message: validationResult.error.message })
    return
  }
  next()
}

module.exports = {
  validateUser,
  validateLogin,
}
