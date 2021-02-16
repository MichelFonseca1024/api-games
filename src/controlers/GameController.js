const Game = require('../app/models/Game')

module.exports = {
  async index (req, res) {
    try {
      const games = await Game.findAll()
      return res.status(200).json(games)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getOne (req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async store (req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async update (req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
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
