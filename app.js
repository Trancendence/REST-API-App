const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require("mongoose")
const DB_HOST = "mongodb+srv://baydindenys:iRAMLfPVZ0GFzMih@transcedence.qm6y54a.mongodb.net/?retryWrites=true&w=majority"
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

mongoose.connect()

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
