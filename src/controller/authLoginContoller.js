'use_strict'

const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { validateErrors } = require('../constants')

class AuthLoginController {
    static async post(req, res) {
        try {
            AuthLoginController.validateBody(req)
            const { userName, password } = req.body

            const user = await User.findOne({ userName })
            if (!user) {
                throw (validateErrors.useNotExists)
            }

            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                return res.status(422).json({ message: 'Senha Inválida' })
            }

            return res.status(200).send()
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

module.exports = AuthLoginController
