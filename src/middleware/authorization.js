const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

class AuthorizationMiddlware {
    static async validate (req, res, next) {
        const token = req.headers?.authorization?.replace('Bearer', '').trim()
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })

        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id
            next()
          })
    }
  }

  module.exports = AuthorizationMiddlware
