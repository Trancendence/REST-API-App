// Import
const express = require('express')
const ctrl = require("../../controllers/contacts")
const router = express.Router()
const {validateBody, isValidId, authenticate} = require("../../middlewares")
const schemas = require("../../schemas/contacts")


// Get list
router.get("/", authenticate, ctrl.list);

// Get by id
router.get("/:id", authenticate, isValidId, ctrl.getById);

// // Add by id
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addById);

// // Delete by id
router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

// // Update by id
router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// // Patch by id
router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

// Export
module.exports = router