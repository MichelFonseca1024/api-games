const Game = require('../app/models/Game')

module.exports = {
  async index (req, res) {
    const games = await Game.findAll()

    return res.status(200).json(games)
  },

  async getOne (req, res) {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid Request' })
    } else {
      const game = await Game.findByPk(Number(id))
      if (game) {
        return res.status(200).json(game)
      } else {
        return res.status(404).json({ error: 'Not found' })
      }
    }
  },

  async store (req, res) {
    const { title, year, price } = req.body
    if (title && !isNaN(price) && !isNaN(year)) {
      const game = await Game.create({ title, year, price })
      if (game) {
        return res.status(201).json({ created: 'ok' })
      } else {
        return res.status(503).json({ error: 'impossible to create' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid Request' })
    }
  },

  async update (req, res) {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid Request' })
    } else {
      const game = await Game.findByPk(Number(id))

      if (game) {
        const { title, price, year } = req.body
        const update = await Game.update(
          { title, price, year },
          {
            where: {
              id
            }
          }
        )
        console.log(update)
        return res.status(200).json({ update: 'ok' })
      } else {
        return res.status(404).json({ error: 'Not found' })
      }
    }
  },

  async del (req, res) {
    try {
      const { id } = req.params
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid Request' })
      } else {
        const deleted = await Game.destroy({
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
