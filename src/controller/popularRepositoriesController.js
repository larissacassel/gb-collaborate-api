'use_strict'

const api = require('../services/api')
const { validateErrors } = require('../constants')
const languages = require('../utils/language')

class PopularRepositoriesController {
    static async get(req, res) {
        try {
            const popularRepos = await PopularRepositoriesController.githubRepositories()

            if (popularRepos.length === 0) {
                throw (validateErrors.requestFail)
            }

            res.status(200).json(popularRepos)
        } catch (err) {
            if (err.code) {
                return res.status(err.code).json(err)
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async githubRepositories() {
       const requests = []

       for (let i = 0; i < languages.length; i++) {
        const req = api.get(`/search/repositories?q=${languages[i].title}+language:${languages[i].title}&sort=stars&order=desc&page=1&per_page=1`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKON}`,
            },
           }).then((response) => response.data.items[0])
             .catch((err) => {
                throw ({ code: err.response.status, message: 'Error' })
            })
            requests.push(req)
       }

       try {
        const repos = await Promise.all(requests)
        return repos
       } catch (error) {
        throw ({ code: err.response.status, message: err.response.message })
       }
    }
}

module.exports = PopularRepositoriesController
