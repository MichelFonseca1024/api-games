const User = require('../app/models/User')

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
      console.log(user)
      if (!user) {
        const userCreated = await User.create({
          name,
          email,
          password
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
    console.log(id)
    const { name, email, password } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid Request' })
    } else {
      const user = await User.findByPk(Number(id))
      if (user) {
        await User.update(
          { name, email, password },
          {
            where: {
              id
            }
          }
        )
        return res.status(200).json({ update: 'ok' })
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
