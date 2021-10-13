const express = require("express");
const controller = require("../controllers/mainController");

const router = express.Router();

// GET index
router.get("/", controller.index);

// about us
router.get("/about", controller.about);

// contact us
router.get("/contact", controller.contact);

module.exports = router;
