const {Contact, joiSchemaContact, joiSchemaContactFavorite} = require('./contact')
const {User, joiSchemaUserSignUp, joiSchemaUserSubscription, joiSchemaUserEmailReverify} = require('./user')

module.exports = {
    Contact,
    User,
    joiSchemaContact,
    joiSchemaContactFavorite,
    joiSchemaUserSignUp,
    joiSchemaUserSubscription,
    joiSchemaUserEmailReverify
}