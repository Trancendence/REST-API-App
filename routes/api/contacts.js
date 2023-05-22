const express = require('express')
// const data = require("../../models/contacts")
const Contact = require("../../models/contact");
const router = express.Router()
const {HttpError} = require("../../models/HttpError")
const Joi = require("joi")
const addSchema = Joi.object({
  name:Joi.string().required().alphanum().min(3).max(30),
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone:Joi.number().required(),
})
// Get list
router.get("/", async (req, res, next)=> {
  try {
  const result = await Contact.find();
  res.json(result);
}
catch(error) {
  next(error);
}
})

// Get by id
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.getContactById(id);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

// Post
router.post("/", async(req, res, next)=> {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error);
  }
})

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.removeContact(id);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted"
    })
  } 
  catch (error) {
    next(error);
  }
})

// Put
router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await Contact.updateContact(id, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error) {
    next(error);
  }
})

module.exports = router