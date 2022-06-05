const {Contact, joiSchemaContact, joiSchemaContactFavorite} = require('./contact')
const {User, joiSchemaUserSignUp, joiSchemaUserSubscription} = require('./user')

module.exports = {
    Contact,
    User,
    joiSchemaContact,
    joiSchemaContactFavorite,
    joiSchemaUserSignUp,
    joiSchemaUserSubscription
}