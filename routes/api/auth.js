const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const {validateBody, authenticate, upload} = require("../../middlewares");

const {schemas} = require("../../models/user");


// Sign Up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.register);

router.post("/verify", validateBody(schemas.userEmailSchema),);

// Sign In

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);


module.exports = router;
