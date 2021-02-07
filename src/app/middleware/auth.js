require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

function auth (req, res, next) {
  const JWTauth = req.headers.authorization
  console.log(req.headers)
  if (JWTauth) {
    const token = JWTauth.split(' ')[1]
    jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        res.status(401).json({
          error: 'without access authorization',
          message: error
        })
      } else {
        const { id, email } = data
        req.token = token
        req.loggedUser = { id, email }
        console.log(data)
        next()
      }
    })
  } else {
    res.status(401).json({
      error: 'without access authorization'
    })
  }
}

module.exports = auth
