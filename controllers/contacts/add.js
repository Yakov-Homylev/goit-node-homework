const {BadRequest} = require("http-errors");

const {Contact} = require('../../models')

const add = async (req, res) => {
    if (req.body === null) {
        throw new BadRequest("Missing fields")
    }
    const newContact = await Contact.create(req.body)
    res.status(201).json({ message: 'success', code: '201', data: newContact })
}

module.exports = add