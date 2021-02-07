const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

require('./app/models')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log('Server is runing i http://localhost:3000')
})
