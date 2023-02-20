const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../../api.json')

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument))

router.get('/', (_req, res) => res.redirect('docs'))
router.get('/hello', (req, res) => res.send('Hello word'))

module.exports = router
