// Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {nanoid} = require("nanoid");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const {User} = require("../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require('../helpers');
const {SECRET_KEY, PROJECT_URL} = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

// Register
const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email}); 

    if (user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();
    const avatarURL = gravatar.url(email); 

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}

// Verify
const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});
    if(!user) {
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        message: "Verify success"
    })
}

// Resend verify email
const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404);
    }
    if(user.verify) {
        throw HttpError(400, "Email already verified")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`
    };
    
    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send"
    })
}

// Login
const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user || !user.verify){
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}
// GetCurrent
const getCurrent = async(req, res)=> {
    const{email, name} = req.user;

    res.json({
        email,
        name,
    })
}
// Logout
const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}
// UpdateAvatar
const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", originalname);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}

// Export
module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}