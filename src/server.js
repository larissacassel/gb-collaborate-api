const express = require('express')
const swaggerUi = require('swagger-ui-express')

const publicRoutesV1 = require('./routes/public/v1')
const routesV1 = require('./routes/v1')

const apiSpec = require('../api.json')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec))
app.use(publicRoutesV1)
app.use(routesV1)

app.listen(port, () => {
    console.log('Server running!')
})
