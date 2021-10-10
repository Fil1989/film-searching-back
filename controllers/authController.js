const {
  registration,
  login,
  logout,
  current,
} = require('../dbServices/authService')
const registrationController = async (req, res) => {
  const { password, email, name } = req.body

  const user = await registration(password, email, name)
  res.status(201).json({ user })
}
const loginController = async (req, res) => {
  const { password, email } = req.body
  const user = await login(email, password)
  if (!user) {
    res.status(404).json({ message: 'user login error' })
  } else {
    res.status(200).json({ message: 'user login success', token: user.token, name:user.name })
  }
}
const logoutController = async (req, res) => {
  const token = req.token
  const nullToken = await logout(token)
  res.status(204).json({ token: nullToken })
}
const currentController = async (req, res) => {
  const token = req.token
  const loginedUser = await current(token)
  if (!loginedUser) {
    res.status(400).json({ message: 'User is not logged in' })
  } else {
    res.status(200).json({ user: loginedUser })
  }
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
}
