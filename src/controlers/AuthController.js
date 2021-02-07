require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../app/models/User')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  async store (req, res) {
    const { email, password } = req.body

    if (email === undefined) {
      res.status(400).json({ error: 'the email cannot be empty' })
    }
    if (password === undefined) {
      res.status(400).json({ error: 'the password cannot be empty' })
    } else {
      const user = await User.findOne({
        where: {
          email
        }
      })
      console.log(user.password)
      if (user) {
        if (user.password === password) {
          jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            {
              expiresIn: '4h'
            },
            (error, token) => {
              if (error) {
                res.status(500).json({ error: 'internal fail' })
              } else {
                res.status(200).json({ token })
              }
            }
          )
        } else {
          res.status(401).json({ error: 'password is incorrect' })
        }
      } else {
        res.status(404).json({ error: 'The user does not exist' })
      }
    }
  }
}
