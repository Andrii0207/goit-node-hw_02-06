const createError = require("http-errors");
const contactsSchema = require("../../contactsSchema");
const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);
  try {
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const { id } = req.params;
    const updatedContact = await contactsOperations.updContact(id, req.body);

    if (!updatedContact) {
      throw createError(404, `Not found`);
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
