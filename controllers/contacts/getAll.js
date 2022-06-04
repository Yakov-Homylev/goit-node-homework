const {Contact} = require('../../models')

const getAll = async (req, res) => {
    const contactsList = await Contact.find({})
    res.status(200).json({ message: 'success', code: '200', data: contactsList })
}

module.exports = getAll