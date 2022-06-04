const {Contact} = require('../../models')

const add = async (req, res) => {
    if (req.body === null) {
        res.status(400).json({"message": "missing fields"})
    }
    const newContact = await Contact.create(req.body)
    res.status(201).json({ message: 'success', code: '201', data: newContact })
}

module.exports = add