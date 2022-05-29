const fs = require('fs/promises')
const path = require('path')

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const findContact = JSON.parse(contactsList).find(contact => contact.id === contactId)
  return findContact
}

const removeContact = async (contactId) => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const newContactsList = JSON.parse(contactsList).filter(contact => contact.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return JSON.parse(contactsList).find(contact => contact.id === contactId)
}

const addContact = async (body) => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const newContact = {...body, id: uuidv4()}
  const newContactsList = [...JSON.parse(contactsList), newContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const newContactsList = JSON.parse(contactsList).map(contact => contact.id === contactId ? {...contact, ...body} : contact);
  const updatedContact = newContactsList.find(contact => contact.id === contactId)
  fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
