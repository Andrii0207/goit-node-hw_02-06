const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

console.log(contactsOperations);

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsOperations.removeContact(id);

    if (!deletedContact) {
      throw createError(404, `Not found`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
