const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

/**
 *Getting contacts' list
 * @returns JSON.parse(contacts)
 */

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

/**
 *Getting a contact by id
 * @param {string} contactId
 **/

const getById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result;
};

/**
 * Remove a contact by id
 * @param {string} contactId
 **/

const removeContact = async (id) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(idx, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Add a new contact
 * @param {object} body
 **/

const createContact = async (body) => {
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

/**
 * Update a contact by id
 * @param {string} contactId
 * @param {object} body
 **/

const updContact = async (id, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  createContact,
  updContact,
};
