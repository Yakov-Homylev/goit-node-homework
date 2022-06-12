const {Schema, model} = require("mongoose")
const Joi = require('joi')
const bcrypt = require('bcryptjs')


const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
})

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSchemaUserSignUp = Joi.object({
    password: Joi.string().min(8).max(16).required(),
    email: Joi.string().email().required(),
})

const joiSchemaUserSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required()
})

const joiSchemaUserEmailReverify = Joi.object({
  email: Joi.string().email().required(),
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiSchemaUserSignUp,
    joiSchemaUserSubscription,
    joiSchemaUserEmailReverify
}
