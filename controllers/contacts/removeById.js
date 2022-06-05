const {NotFound} = require("http-errors");

const {Contact} = require('../../models')

const removeById = async (req, res) => {
    const {contactId} = req.params
    const deletedContact = await Contact.findByIdAndRemove(contactId)
    if (!deletedContact) {
        throw new NotFound("Not found")
      }
    res.status(200).json({ message: 'contact deleted', code: '200'})
}

module.exports = removeById