const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts.json");

const { v4 } = require("uuid");

/*
1. Получить все контакты
2. Получить один контакт по id
3. Добавить контакт
4. Обновить сонтакт по id
5. Удалить сонтакт по id
*/

// GET /api/contacts
router.get("/", async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
});

// GET /api/contacts/:id
router.get("/:contactId", (req, res, next) => {
  const { contactId } = req.params;
  const result = contacts.find((item) => item.id === contactId);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Product with id=${contactId} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
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
