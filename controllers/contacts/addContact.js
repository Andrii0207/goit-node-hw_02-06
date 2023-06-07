const contactsSchema = require("../../contactsSchema");
const contactsOperation = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing required ${error.message.split(" ")[0]} field`;
      throw error;
    }
    const result = await contactsOperation.createContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
