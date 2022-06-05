const express = require('express')

const {validation, wrapper, auth} = require('../../middlewares')

const {users} = require("../../controllers")
const {joiSchemaUserSignUp, joiSchemaUserSubscription} = require('../../models')

const router = express.Router()

router.post('/signup', validation(joiSchemaUserSignUp), wrapper(users.signup))

router.post('/login', validation(joiSchemaUserSignUp), wrapper(users.login))

router.get('/logout', auth, wrapper(users.logout))

router.get('/current', auth, wrapper(users.currentInfo))

router.patch('/', auth, validation(joiSchemaUserSubscription), wrapper(users.subscriptionUpdate))

module.exports = router