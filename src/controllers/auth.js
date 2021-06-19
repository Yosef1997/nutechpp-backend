const authModal = require('../modals/auth')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { APP_KEY } = process.env

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const isExists = await authModal.getUsersByCondition({ email })
    if (isExists.length < 1) {
      const salt = await bcrypt.genSalt()
      const encryptedPassword = await bcrypt.hash(password, salt)
      let createUser = null
      if (email === 'admin1234@gmail.com') {
        createUser = await authModal.createUser({ email, password: encryptedPassword, role: 1 })
      } else {
        createUser = await authModal.createUser({ email, password: encryptedPassword, role: 2, firstname: null, lastname: null, picture: null, phoneNumber: null })
      }

      if (createUser.insertId > 0) {
        return response(res, 200, true, 'Register Success', {
          id: createUser.insertId
        })
      } else {
        return response(res, 400, false, 'Register Failed')
      }
    } else {
      return response(res, 400, false, 'Register Failed, email already exists')
    }
  } catch (error) {
    return response(res, 400, false, 'Bad Request')
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await authModal.getUsersByCondition({ email })
    if (existingUser.length > 0) {
      const compare = bcrypt.compareSync(password, existingUser[0].password)
      if (compare) {
        const { id, email, role, firstName, lastName, phoneNumber, picture } = existingUser[0]
        const token = jwt.sign({ id, email, role, firstName, lastName, phoneNumber, picture }, APP_KEY)
        console.log(token)
        return response(res, 200, true, 'Login succesfully', token)
      } else {
        return response(res, 401, false, 'Wrong email or password')
      }
    }
    return response(res, 401, false, 'Email not registered')
  } catch (error) {
    console.log(error)
    return response(res, 400, false, 'Bad Request')
  }
}
