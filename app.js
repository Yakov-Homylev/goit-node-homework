const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  if (req.method === 'POST') {
    res.status(400).json({message: err.message})
  }
  if (req.method === 'PUT') {
    res.status(400).json({message: err.message})
  }
  res.status(500).json({ message: err.message })
})

module.exports = app
