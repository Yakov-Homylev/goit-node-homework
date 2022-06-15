const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const currentInfo = require('./currentInfo')
const subscriptionUpdate = require('./subscriptionUpdate')
const avatarUpdate = require('./avatarUpdate')
const verify = require('./verify')
const resendVerify = require('./resendVerify')

module.exports = {
    signup,
    login,
    logout,
    currentInfo,
    subscriptionUpdate,
    avatarUpdate,
    verify,
    resendVerify
}