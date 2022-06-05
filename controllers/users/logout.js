const {User} = require('../../models')

const logout = async (req, res) => {
    const {_id: id} = req.user
    await User.findByIdAndUpdate(id, {token: null})
    res.status(204).json({message: 'success', code: '204'})
}

module.exports = logout