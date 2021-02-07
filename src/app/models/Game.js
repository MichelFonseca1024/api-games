const { Model, DataTypes } = require('sequelize')

class Game extends Model {
  static init (sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        year: DataTypes.INTEGER,
        price: DataTypes.INTEGER
      },
      {
        sequelize
      }
    )
  }
}

module.exports = Game
