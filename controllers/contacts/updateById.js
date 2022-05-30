const {Contact} = require('../../models')

const updateById = async (req, res) => {
    if (req.body === null) {
        res.status(400).json({"message": "missing fields"})
    }
    const {contactId} = req.params
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!contact) {
      res.status(404).json({"message": "Not found", code: '404'})
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = updateById