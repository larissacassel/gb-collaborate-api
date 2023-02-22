'use_strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { validateErrors } = require('../constants')

class UserLoginController {
    static async post(req, res) {
        try {
            UserLoginController.validateBody(req)
            const { userName, password } = req.body

            const user = await User.findOne({ userName })
            if (!user) {
                throw (validateErrors.userNotExists)
            }

            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                return res.status(401).json({ message: 'Senha Inválida' })
            }

            const secret = process.env.SECRET
            const token = jwt.sign({
                id: user._id,
            }, secret)

            return res.status(200).json({ token })
        } catch (err) {
            if (err.code) {
                return res.status(err.code).json(err)
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static validateBody(req) {
        if (!req.body) {
            throw (validateErrors.requestFail)
        }

        if (!req.body.userName) {
            throw (validateErrors.userNameIsRequired)
        }

        if (!req.body.password) {
            throw (validateErrors.passwordIsRequired)
        }
    }
}

module.exports = UserLoginController
