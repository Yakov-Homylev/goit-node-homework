const currentInfo = async (req, res) => {
    const {email, subscription, avatarURL} = req.user
    res.status(200).json({message: 'success', code: '200', data: {
        email,
        subscription,
        avatarURL
    }})
}

module.exports = currentInfo