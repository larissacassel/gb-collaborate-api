'use_strict'

const languages = require('../utils/language')

class LanguagesController {
    static async get(req, res) {
        res.status(200).json(languages)
    }
}

module.exports = LanguagesController
