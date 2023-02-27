const router = require('express').Router()
const {
 UserCreateController, UserLoginController, LanguagesController, RepositoriesController, UserController, PopularRepositoriesController,
} = require('../controller/index')

const AuthorizationMiddlware = require('../middleware/authorization')

router.get('/', (_req, res) => res.redirect('docs'))
router.post('/user/create', UserCreateController.post)
router.post('/user/login', UserLoginController.post)
router.get('/user', AuthorizationMiddlware.validate, UserController.get)
router.get('/languages', LanguagesController.get)
router.get('/repos/:language', RepositoriesController.get)
router.get('/repos', PopularRepositoriesController.get)

module.exports = router
