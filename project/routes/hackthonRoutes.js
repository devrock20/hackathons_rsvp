const express = require("express");
const controller = require("../controllers/hackathonController");
const { isLoggedIn } = require("../middlewares/auth");
const { isAuthor } = require("../middlewares/auth");
const { validateId } = require("../middlewares/validator");

const router = express.Router();
//GET /hackthons : send all hackthonss to the user

router.get("/", controller.index);

//GET /hackthons/new: send html form for creating a new story.
router.get("/new", isLoggedIn, controller.new);

//POST /hackthons: create a new story
router.post("/", isLoggedIn, controller.create);

//GET /hackthons/:id: send details of story identified by id
router.get("/:id", validateId, controller.show);

//GET /hackthons/:id/edit: send html form for edting an existing story
router.get("/:id/edit", validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /hackthons/:id: update the story identified by the id
router.put("/:id", validateId, isLoggedIn, isAuthor, controller.update);

//DELETE /hackthons/:id, delete the story identified by id
router.delete("/:id", validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;
