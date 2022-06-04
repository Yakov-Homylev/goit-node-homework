const {Schema, model} = require("mongoose")
const Joi = require('joi')

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

const joiSchemaContact = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(8).max(16).required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean().default(false)
})
const joiSchemaContactFavorite = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    joiSchemaContact,
    joiSchemaContactFavorite
}