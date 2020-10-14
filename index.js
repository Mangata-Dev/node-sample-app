const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const itemRouters = require('./routers/items')
const listRouters = require('./routers/lists')
const app = express()

const PORT = process.env.API_PORT || 3000

// Use morgan to log http requests
app.use(
  morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms',
  ),
)
app.use(bodyParser.json({ limit: '10mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 10000,
  }),
)
// Load root route
app.get('/', (req, res) => res.status(200).json({ message: 'Todo server API' }))
app.use(itemRouters)
app.use(listRouters)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Todo server API is listening on port ${PORT}`)
  })
}

module.exports = app
