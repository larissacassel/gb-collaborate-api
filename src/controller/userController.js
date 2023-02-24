const User = require('../models/User')
const { validateErrors } = require('../constants')

class UserController {
    static async get(req, res) {
        try {
            if (!req) {
                throw (validateErrors.requestFail)
            }
            const { userId } = req
            const user = await User.findById(userId, '-password')
            if (!user) {
                throw (validateErrors.userNotExists)
            }
            return res.status(200).json(user)
        } catch (err) {
            if (err.code) {
                return res.status(err.code).json(err)
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = UserController
