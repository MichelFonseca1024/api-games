require('dotenv').config()
module.exports = {
  url: process.env.DATABASE_URL,

  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  type: process.env.DATABASE_TYPE,
  dialect: process.env.DATABASE_DIALECT,
  define: {
    timestamps: true
  }
}
