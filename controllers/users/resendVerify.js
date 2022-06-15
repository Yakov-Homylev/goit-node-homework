const {BadRequest} = require("http-errors");
const {sendEmail} = require('../../helpers')

const {User} = require('../../models')

const resendVerify = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if (!user || user.verify) {
        throw new BadRequest('Verification has already been passed')
    }
    const mail = {
        to: email,
        subject: "Регистрация нового пользователя",
        html: `<p>Подтвердить вашу почту, перейдя по ссылке localhost:3000/users/verify/${user.verificationToken}</p>`
    }

    await sendEmail(mail)
    res.status(200).json({ message: 'Verification email sent', code: '200'})
}

module.exports = resendVerify