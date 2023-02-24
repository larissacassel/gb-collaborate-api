const jwt = require('jsonwebtoken')
const { decode } = require('jsonwebtoken')

module.exports = {
  ...jwt,
  decode,
}
