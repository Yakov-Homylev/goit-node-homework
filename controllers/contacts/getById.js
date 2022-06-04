const {Contact} = require('../../models')

const getById = async (req, res) => {
    const {contactId} = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
        res.status(404).json({"message": "Not found", code: '404'})
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = getById