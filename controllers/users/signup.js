const {Conflict} = require('http-errors')
const gravatar = require("gravatar")

const {User} = require('../../models')

const signup = async (req, res) => {
    const {email, password} = req.body
    const isEmailInDB = await User.findOne({email})
    if (isEmailInDB) {
        throw new Conflict("Email in use")
    }
    const avatarURL = gravatar.url(email)
    const newUser = new User({email, avatarURL})
    newUser.setPassword(password)
    newUser.save()
    res.status(201).json({ message: 'success', code: '201', data: {
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL
        }
    } })
}

module.exports = signup