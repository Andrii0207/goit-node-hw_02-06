const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
