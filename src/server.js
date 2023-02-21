require('dotenv/config')
const express = require('express')
const swaggerUi = require('swagger-ui-express')

const mongoose = require('mongoose')
const publicRoutesV1 = require('./routes/public/v1')
const routesV1 = require('./routes/v1')

const apiSpec = require('../api.json')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec))
app.use(publicRoutesV1)
app.use(routesV1)

const enviroment = process.env.NODE_ENV
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

let url = 'mongodb://db:27017'
if (enviroment === 'production') {
  url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.tsa2hxj.mongodb.net/?retryWrites=true&w=majority`
}

mongoose
  .connect(url)
  .then(() => {
    console.log('DB UP!')
  })
  .catch((error) => {
    console.log(error)
  })

app.listen(port, () => {
    console.log('Server running!')
})
