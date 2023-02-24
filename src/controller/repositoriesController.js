'use_strict'

const api = require('../services/api')
const { validateErrors } = require('../constants')

class RepositoriesController {
    static async get(req, res) {
        try {
            if (!req || !req.params) {
                throw (validateErrors.requestFail)
            }
            if (!req.params.language) {
                throw (validateErrors.requestFail)
            }

            const { language } = req.params
            const languageRepos = await RepositoriesController.githubRepositories(language)

            if (languageRepos.length === 0) {
                res.status(422).json({ message: 'linguagem de programação invalida' })
            }

            res.status(200).json(languageRepos)
        } catch (err) {
            if (err.code) {
                return res.status(err.code).json(err)
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static githubRepositories(language) {
        return api.get(`/legacy/repos/search/${language}`)
        .then((response) => response.data.repositories)
        .catch((err) => {
            throw ({ code: err.response.status, message: 'linguagem de programação invalida' })
        })
    }
}

module.exports = RepositoriesController
