const {BadRequest, NotFound} = require("http-errors");

const {Contact} = require('../../models')

const updateFavoriteById = async (req, res) => {
    if (req.body === null) {
        throw new BadRequest("Missing field favorite")
    }
    const {contactId} = req.params
    const {favorite} = req.body
    const contact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
    if (!contact) {
      throw new NotFound("Not found")
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = updateFavoriteById