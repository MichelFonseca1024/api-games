const User = require('../app/models/User')
const bcrypt = require('bcrypt')

module.exports = {
  async index (req, res) {
    const users = await User.findAll()
    return res.status(200).json(users)
  },
  async getOne (req, res) {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ error: 'user not found' })
    }
  },
  async store (req, res) {
    const { name, email, password } = req.body
    if (name === undefined) {
      return res.status(400).json({ error: 'the name cannot be empty' })
    }
    if (email === undefined) {
      return res.status(400).json({ error: 'the email cannot be empty' })
    }
    if (password === undefined) {
      return res.status(400).json({ error: 'the password cannot be empty' })
    } else {
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const userCreated = await User.create({
          name,
          email,
          password: hash
        })
        if (userCreated) {
          return res.status(201).json({ created: 'ok' })
        }
      } else {
        return res.status(400).json({ error: 'Email exists' })
      }
    }
  },
  async update (req, res) {
    const { id } = req.params
    const { name, email, oldPassword, newPassword } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid Request' })
    } else {
      const user = await User.findByPk(Number(id))
      if (user) {
        if (oldPassword === newPassword) {
          return res.status(401).json({
            error: 'the password cannot be the same as the old one'
          })
        }
        const correct = bcrypt.compareSync(oldPassword, user.password)
        if (correct) {
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(newPassword, salt)
          await User.update(
            { name, email, password: hash },
            {
              where: {
                id
              }
            }
          )
          return res.status(200).json({ update: 'ok' })
        } else {
          return res.status(422).json({ error: 'old password is incorrect' })
        }
      } else {
        return res.status(404).json({ error: 'user not found' })
      }
    }
  },
  async del (req, res) {
    try {
      const { id } = req.params
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid Request' })
      } else {
        const deleted = await User.destroy({
          where: {
            id
          }
        })
        console.log(deleted)
        if (deleted) {
          return res.status(200).json({ del: 'ok' })
        } else {
          return res.status(404).json({ error: 'Not found' })
        }
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }
}
