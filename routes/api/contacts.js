// Import
const express = require('express')
const ctrl = require("../../controllers/contacts")
const router = express.Router()
const {validateBody, isValidId} = require("../../middlewares")
const schemas = require("../../schemas/contacts")


// Get list
router.get("/", ctrl.list);

// Get by id
router.get("/:id", isValidId, ctrl.getById);

// // Add by id
router.post("/", validateBody(schemas.addSchema), ctrl.addById);

// // Delete by id
router.delete('/:id', isValidId, ctrl.deleteById);

// // Update by id
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// Export
module.exports = router