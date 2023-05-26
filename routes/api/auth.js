const express = require("express");

const router = express.Router();

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user");

// Sign up
router.post("/register", validateBody(schemas.registerSchema), )

module.exports = router;
