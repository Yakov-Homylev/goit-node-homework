const {NotFound} = require("http-errors");

const {Contact} = require('../../models')

const getById = async (req, res) => {
    const {contactId} = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
        throw new NotFound("Not found")
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = getById