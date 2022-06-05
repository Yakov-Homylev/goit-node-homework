const {BadRequest, NotFound} = require("http-errors");

const {Contact} = require('../../models')

const updateById = async (req, res) => {
    if (req.body === null) {
        throw new BadRequest("Missing field")
    }
    const {contactId} = req.params
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!contact) {
      throw new NotFound("Not found")
    }
    res.status(200).json({ message: 'success', code: '200', data: contact })
}

module.exports = updateById