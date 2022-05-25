const express = require('express')

const router = express.Router()

const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(8).max(16).required(),
    email: Joi.string().email().required(),
})

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json({ message: 'success', code: '200', data: contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if (!contact) {
    res.status(404).json({"message": "Not found", code: '404'})
  }
  res.status(200).json({ message: 'success', code: '200', data: contact })
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = await contactsSchema.validate(req.body)
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await addContact(req.body)
    res.status(201).json({ message: 'success', code: '201', data: newContact })
  } catch (error) {
    next({"message": "missing required name field"})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId)
  if (!contact) {
    res.status(404).json({"message": "Not found", code: '404'})
  }
  res.status(200).json({ message: 'contact deleted', code: '200'})
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (res.body === null) {
      res.status(400).json({"message": "missing fields"})
    }
    const {error} = contactsSchema.validate(req.body)
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await updateContact(req.params.contactId, req.body)
    if (!contact) {
      res.status(404).json({"message": "Not found", code: '404'})
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
  } catch (error) {
    next({"message": "missing fields"})
  }
})

module.exports = router
