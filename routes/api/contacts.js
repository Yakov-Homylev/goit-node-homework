const express = require('express')

const {validation, wrapper} = require('../../middlewares')

const {contacts} = require("../../controllers")
const {joiSchemaContact, joiSchemaContactFavorite} = require('../../models')

const router = express.Router()

router.get('/', wrapper(contacts.getAll))

router.get('/:contactId', wrapper(contacts.getById))

router.post('/', validation(joiSchemaContact), wrapper(contacts.add))

router.delete('/:contactId', wrapper(contacts.removeById))

router.put('/:contactId', validation(joiSchemaContact), wrapper(contacts.updateById))

router.patch('/:contactId/favorite', validation(joiSchemaContactFavorite), wrapper(contacts.updateFavoriteById))

module.exports = router
