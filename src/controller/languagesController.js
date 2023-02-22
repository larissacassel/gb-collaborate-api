'use_strict'

class LanguagesController {
    static async get(req, res) {
        res.status(200).json({ languages: ['javascript', 'go', 'java', 'react', 'nodejs'] })
    }
}

module.exports = LanguagesController
