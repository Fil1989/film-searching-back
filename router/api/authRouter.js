const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
} = require('../../controllers/authController')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const {
  validateUser,
  validateLogin,
} = require('../../middlewares/validationMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/register', validateUser, asyncWrapper(registrationController))

router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(currentController))

module.exports = router
