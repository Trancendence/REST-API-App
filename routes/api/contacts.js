const express = require('express')
const data = require("../../models/contacts")
const router = express.Router()

// Get list of contacts
router.get("/", async (req, res)=> {
  try {
  const result = await data.listContacts();
  res.json(result);
}
catch(error) {
  res.status(500).json({
    message: "Server error"
  })
}
})

// Get contact by id
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const result = await data.getContactById(id);
    res.json(result);
  }
  catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
