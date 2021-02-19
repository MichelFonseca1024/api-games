'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || 'development'
const config = require('../../config/database')
const db = {}

const Game = require('./Game')
const User = require('./User')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(config)
} else if (config.url) {
  console.log(config.url)
  sequelize = new Sequelize(config.url)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

Game.init(sequelize)
User.init(sequelize)

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const Model = require(path.join(__dirname, file))
    const model = new Model(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
