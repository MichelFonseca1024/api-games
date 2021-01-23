const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const DB = {
  games: [
    {
      id: 1,
      title: 'Call of Duty',
      year: 2019,
      price: 60
    },
    {
      id: 2,
      title: 'Sea of thieves',
      year: 2018,
      price: 40
    },
    {
      id: 3,
      title: 'minecraft',
      year: 2012,
      price: 30
    }
  ]
}

app.get('/games', (req, res) => {
  res.statusCode = 200
  res.json(DB)
})

app.get('/game/:id', (req, res) => {
  const id = req.params.id
  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
    const game = DB.games.find(game => game.id === Number(id))
    if (game) {
      res.json(game)
    } else {
      res.sendStatus(404)
    }
  }
})

app.post('/game', (req, res) => {
  const { title, price, year } = req.body
  if (title && !isNaN(price) && !isNaN(year)) {
    DB.games.push({
      id: DB.games.length + 1,
      title,
      price,
      year
    })
    res.sendStatus(201)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/game/:id', (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
    const index = DB.games.findIndex(game => game.id === Number(id))
    if (index === -1) {
      res.sendStatus(404)
    } else {
      DB.games.splice(index, 1)
      res.sendStatus(200)
    }
  }
})

app.put('/game/:id', (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    res.sendStatus(400)
  } else {
    const game = DB.games.find(game => game.id === Number(id))
    if (game) {
      const { title, price, year } = req.body
      console.log(title, price, year)
      if (title) {
        game.title = title
      }
      if (!isNaN(price)) {
        game.price = price
      }
      if (!isNaN(year)) {
        game.year = year
      }
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  }
})

app.listen(3000, () => {
  console.log('Server is runing i http://localhost:3000')
})
