'use_strict'

const api = require('../services/api')

class RepositoriesController {
    static async get(req, res) {
        try {
            const { language } = req.params
            const languageRepos = await RepositoriesController.githubRepositories(language)

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
            throw ({ code: err.response.status, message: 'tec invalido' })
        })
    }
}

module.exports = RepositoriesController
