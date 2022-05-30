const {Contact} = require('../../models')

const removeById = async (req, res) => {
    const {contactId} = req.params
    const deletedContact = await Contact.findByIdAndRemove(contactId)
    if (!deletedContact) {
        res.status(404).json({"message": "Not found", code: '404'})
      }
    res.status(200).json({ message: 'contact deleted', code: '200'})
}

module.exports = removeById