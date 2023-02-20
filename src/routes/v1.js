const router = require('express').Router()

router.get('/', (_req, res) => res.redirect('docs'))

module.exports = router
