// Import
const express = require('express')
const ctrl = require("../../controllers/contacts")
const router = express.Router()
const {validateBody} = require("../../middlewares")
const schemas = require("../../schemas/contacts")


// Get list
router.get("/", ctrl.list);

// Get by id
router.get("/:id", ctrl.getById);

// Post
router.post("/", validateBody(schemas.addSchema), ctrl.addById);

// Delete
router.delete('/:id', ctrl.deleteById);

// Put
router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router