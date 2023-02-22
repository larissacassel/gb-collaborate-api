require('dotenv/config')
const mongoose = require('mongoose')

const enviroment = process.env.NODE_ENV
const dbProductionUrl = process.env.DB_PRODUCTION_URL
const dbLocalUrl = process.env.DB_LOCAL_URL

const URL = (enviroment === 'production') ? dbProductionUrl : dbLocalUrl

mongoose.set('strictQuery', true)
mongoose
  .connect(URL)
  .then(() => console.log('DB UP!', URL))
  .catch((error) => console.log(error))
