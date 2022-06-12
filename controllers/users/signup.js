const {Conflict} = require('http-errors')
const gravatar = require("gravatar")
const {nanoid} = require("nanoid");

const {User} = require('../../models')
const {sendEmail} = require('../../helpers')

const signup = async (req, res) => {
    const {email, password} = req.body
    const isEmailInDB = await User.findOne({email})
    if (isEmailInDB) {
        throw new Conflict("Email in use")
    }
    const avatarURL = gravatar.url(email)

    const verificationToken = nanoid(8)

    const newUser = new User({email, avatarURL, verificationToken})
    newUser.setPassword(password)
    newUser.save()

    const mail = {
        to: email,
        subject: "Регистрация нового пользователя",
        html: `<p>Подтвердить вашу почту, перейдя по ссылке localhost:3000/users/verify/${verificationToken}</p>`
    }

    await sendEmail(mail)

    res.status(201).json({ message: 'success', code: '201', data: {
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
            verificationToken: newUser.verificationToken
        }
    } })
}

module.exports = signup