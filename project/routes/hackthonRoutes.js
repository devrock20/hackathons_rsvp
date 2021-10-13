const express = require("express");
const controller = require("../controllers/hackthonController");

const router = express.Router();
//GET /hackthons : send all hackthonss to the user

router.get("/", controller.index);

//GET /hackthons/new: send html form for creating a new story.
router.get("/new", controller.new);

//POST /hackthons: create a new story
router.post("/", controller.create);

//GET /hackthons/:id: send details of story identified by id
router.get("/:id", controller.show);

//GET /hackthons/:id/edit: send html form for edting an existing story
router.get("/:id/edit", controller.edit);

//PUT /hackthons/:id: update the story identified by the id
router.put("/:id", controller.update);

//DELETE /hackthons/:id, delete the story identified by id
router.delete("/:id", controller.delete);

module.exports = router;
