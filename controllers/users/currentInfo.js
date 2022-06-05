const currentInfo = async (req, res) => {
    const {email, subscription} = req.user
    res.status(200).json({message: 'success', code: '200', data: {
        email,
        subscription,
    }})
}

module.exports = currentInfo