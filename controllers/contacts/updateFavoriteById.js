const {Contact} = require('../../models')

const updateFavoriteById = async (req, res) => {
    if (req.body === null) {
        res.status(400).json({"message": "missing field favorite"})
    }
    const {contactId} = req.params
    const {favorite} = req.body
    const contact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
    if (!contact) {
      res.status(404).json({"message": "Not found", code: '404'})
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = updateFavoriteById