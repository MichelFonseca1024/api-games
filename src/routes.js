const express = require('express')
const auth = require('./app/middleware/auth')
const GameController = require('./controlers/GameController')
const UserController = require('./controlers/UserController')
const AuthController = require('./controlers/AuthController')

const routes = express.Router()

routes.get('/', (req, res) => {
  return res.json({
    hello: 'word'
  })
})

routes.get('/games', GameController.index)
routes.get('/game/:id', GameController.getOne)
routes.post('/game', auth, GameController.store)
routes.put('/game/:id', auth, GameController.update)
routes.delete('/game/:id', auth, GameController.del)

routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.getOne)
routes.post('/user', auth, UserController.store)
routes.put('/user/:id', auth, UserController.update)
routes.delete('/user/:id', auth, UserController.del)

routes.post('/auth', AuthController.store)

module.exports = routes
