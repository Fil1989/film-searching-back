const { FilmsUser } = require('../dbModels/userModel')
require('dotenv').config()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const registration = async (password, email, name) => {
  const user = new FilmsUser({
    password: await bcrypt.hash(
      password,
      Number.parseInt(process.env.BCRYPT_NUMBER),
    ),
    email,
    name,
  })

  await user.save()
  return user
}
const login = async (email, password) => {
  let user = await FilmsUser.findOne({
    email,
  })
  const rightPassword = await bcrypt.compare(password, user.password)
  if (rightPassword) {
    const createdAt = new Date()
    const token = jwt.sign(
      { _id: user._id, createdAt },
      process.env.JWT_SECRET,
      { expiresIn: '4h' },
    )
    user.token = token

    user = await FilmsUser.findOneAndUpdate(
      { email },
      {
        $set: user,
      },
    )
    user = await FilmsUser.findOne({
      email,
    })
    return user
  }
  return rightPassword
}
const logout = async token => {
  let user = await FilmsUser.findOneAndUpdate(
    { token },
    {
      $set: { token: null },
    },
  )
  user = await FilmsUser.findById(user._id)
  return user.token
}
const current = async token => {
  const loginedUser = await FilmsUser.findOne({
    token,
  })
  return loginedUser
}

module.exports = {
  registration,
  login,
  logout,
  current,
}
