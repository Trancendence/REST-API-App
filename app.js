const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const data = require("./models/contacts")
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

// List
app.get("/contacts", async (req, res)=> {
  const result = await data.listContacts();
  res.json(result);
});

// Contact by id
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await data.getContactById(id);
    if (!result) {
      const error = new Error(`Contact with ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  }
  catch (error) {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
      message,
    })
  }
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
    res.status(status).json({ message, })
})

module.exports = app
