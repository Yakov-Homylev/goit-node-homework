const {Contact} = require('../../models')

const getAll = async (req, res) => {
    const {page = 1, limit = 5} = req.query
    const skip = (page - 1) * limit
    const contactsList = await Contact.find(req.query, '', {skip, limit: Number(limit)})
    res.status(200).json({ message: 'success', code: '200', data: contactsList })
}

module.exports = getAll