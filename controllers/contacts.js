const Joi = require("joi")
const data = require("../models/contacts");
const { HttpError , ctrlWrapper } = require('../helpers');

const addSchema = Joi.object({
  name:Joi.string().required().alphanum().min(3).max(30),
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone:Joi.number().required(),
})

// list
const list = async(req, res)=> {
    try {
        const result = await data.list();
        res.json(result);
    } catch (error) {
        next(error)
    }
}

// getById
const getById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await data.getContactById(id);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    }
    catch (error) {
      next(error);
    }
}

// addById
const addById = async(req, res, next)=> {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const result = await data.addById(req.body);
      res.status(201).json(result);
    }
    catch(error) {
      next(error);
    }
  }

//   updateById
  const updateById = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {id} = req.params;
      const result = await data.updateById(id, req.body);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    }
    catch(error) {
      next(error);
    }
  }

// deleteById
 const deleteById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await data.removeContact(id);
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
  }

module.exports = { 
    list,
    getById,
    addById,
    updateById,
    deleteById
}