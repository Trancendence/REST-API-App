const Joi = require("joi")

const addSchema = Joi.object({
  name:Joi.string().required().alphanum().min(3).max(30),
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone:Joi.number().required(),
})

module.exports = {
    addSchema,
}