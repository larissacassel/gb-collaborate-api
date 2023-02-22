'use_strict'

const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { validateErrors } = require('../constants')
const api = require('../services/api')

class UserCreateController {
    static async post(req, res) {
        try {
            UserCreateController.validateBody(req)
            const { userName, password } = req.body
            const avatar = await UserCreateController.githubUserAvatar(userName)

            const userExists = await User.findOne({ userName })
            if (userExists) {
                throw (validateErrors.userExists)
            }

            const salt = await bcrypt.genSalt(12)
            const paswordHash = await bcrypt.hash(password, salt)

            const user = new User({
                avatar,
                userName,
                password: paswordHash,
            })

            await user.save()
            return res.status(201).json(user)
        } catch (err) {
            if (err.code) {
                return res.status(err.code).json(err)
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static validateBody(req) {
        if (!req || !req.body) {
            throw (validateErrors.requestFail)
        }

        if (!req.body.userName) {
            throw (validateErrors.userNameIsRequired)
        }

        if (!req.body.password) {
            throw (validateErrors.passwordIsRequired)
        }

        if (!req.body.confirmPassword) {
            throw (validateErrors.confirmPasswordIsRequired)
        }

        if (req.body.password !== req.body.confirmPassword) {
            throw (validateErrors.differentsPasswords)
        }
    }

    static githubUserAvatar(userName) {
        return api.get(`/users/${userName}`)
        .then((response) => response.data.avatar_url)
        .catch((err) => {
            throw ({ code: err.response.status, message: 'Usuário do github inválido' })
        })
    }
}

module.exports = UserCreateController
