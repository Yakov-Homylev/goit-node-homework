const express = require('express')

const {validation, wrapper, auth, fileUpload} = require('../../middlewares')

const {users} = require("../../controllers")
const {joiSchemaUserSignUp, joiSchemaUserSubscription, joiSchemaUserEmailReverify} = require('../../models')

const router = express.Router()

router.post('/signup', validation(joiSchemaUserSignUp), wrapper(users.signup))

router.post('/login', validation(joiSchemaUserSignUp), wrapper(users.login))

router.get('/logout', auth, wrapper(users.logout))

router.get('/current', auth, wrapper(users.currentInfo))

router.patch('/', auth, validation(joiSchemaUserSubscription), wrapper(users.subscriptionUpdate))

router.patch('/avatars', auth, fileUpload.single('avatar'), wrapper(users.avatarUpdate))

router.get('/verify/:verificationToken', wrapper(users.verify))

router.post('/verify', validation(joiSchemaUserEmailReverify), wrapper(users.resendVerify))

module.exports = router