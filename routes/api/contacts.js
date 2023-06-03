const { v4 } = require("uuid");
const express = require("express");
const router = express.Router();

const contactsOperations = require("../../models/contacts");

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
      const error = new Error(`Product with id=${contactId} not found`);
      error.status = 404;
      throw error;
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
router.post("/", (req, res, next) => {
  const newContact = { ...req.body, id: v4() };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
  console.log(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
