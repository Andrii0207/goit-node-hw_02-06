const { v4 } = require("uuid");
const createError = require("http-errors");
// const Joi = require("joi");
// const { NotFound } = require("http-errors");
const express = require("express");
const router = express.Router();

const contactsOperations = require("../../models/contacts");
const contactsSchema = require("../../contactsSchema");
// const contactsSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

/*
1. Получить все контакты
2. Получить один контакт по id
3. Добавить контакт
4. Обновить сонтакт по id
5. Удалить сонтакт по id
*/

// GET /api/contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:id
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw createError(404, `Product with id=${contactId} not found`);
      // throw new NotFound(`Product with id=${contactId} not found`);

      // const error = new Error(`Product with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
    console.log(req.body);
  } catch (error) {
    next(error);
  }

  // const newContact = { ...req.body, id: v4() };
  // contacts.push(newContact);
  // res.status(201).json({
  //   status: "success",
  //   code: 201,
  //   data: { result: newContact },
  // });
  // console.log(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);

    if (!deletedContact) {
      throw createError(404, `Product with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "Product deleted",
      data: {
        result: deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);
  try {
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const updatedContact = await contactsOperations.updateContact(id, req.body);
    console.log(updatedContact);

    if (!updatedContact) {
      throw createError(404, `Product with id=${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
