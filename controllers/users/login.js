const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");

const {User} = require('../../models')

const {SECRET_KEY} = process.env

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user || !user.comparePassword(password) || !user.verify) {
        throw new Unauthorized("Email or password is wrong, or email not verified")
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "4h"})
    await User.findByIdAndUpdate(user._id, {token})
    res.status(200).json({message: 'success', code: '200', data: {
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL
        },
        token
    }})
}

module.exports = login