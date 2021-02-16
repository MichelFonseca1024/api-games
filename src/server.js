const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

require('./app/models')

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is runing i http://localhost:${port}`)
})
