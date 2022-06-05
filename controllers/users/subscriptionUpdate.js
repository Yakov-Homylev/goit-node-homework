const {User} = require('../../models')

const subscriptionUpdate = async (req, res) => {
    const {_id: id} = req.user
    const {subscription} = req.body
    const user = await User.findByIdAndUpdate(id, {subscription}, {new: true})
    res.status(201).json({
        message: 'success',
        code: '200',
        data: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

module.exports = subscriptionUpdate