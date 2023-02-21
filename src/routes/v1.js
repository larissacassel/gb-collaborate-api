const router = require('express').Router()
const { AuthRegisterController, AuthLoginController } = require('../controller/index')

router.get('/', (_req, res) => res.redirect('docs'))
router.post('/auth/register', AuthRegisterController.post)
router.post('/auth/user', AuthLoginController.post)

module.exports = router
