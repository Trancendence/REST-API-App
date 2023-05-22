const express = require('express')
const ctrl = require("../../controllers/contacts")
const router = express.Router()


// Get list
router.get("/", ctrl.list);

// Get by id
router.get("/:id", ctrl.getById);

// Post
router.post("/", ctrl.addById);

// Delete
router.delete('/:id', 

// Put
router.put('/:id', ctrl.updateById)

module.exports = router