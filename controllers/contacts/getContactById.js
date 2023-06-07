const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getById(id);

    if (!result) {
      throw createError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
