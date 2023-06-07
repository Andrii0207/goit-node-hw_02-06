const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

// const createError = require("http-errors");
// const contactsOperations = require("../../models/contacts");
// const contactsSchema = require("../../contactsSchema");

// console.log(contactsOperations);

// GET /api/contacts
router.get("/", ctrl.getAllContacts);

// GET /api/contacts/:id
router.get("/:contactId", ctrl.getContactById);

// POST /api/contacts
router.post("/", ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", ctrl.updateContact);

module.exports = router;
