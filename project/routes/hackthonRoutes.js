const express = require("express");
const controller = require("../controllers/hackathonController");
const { isLoggedIn, isAuthor, isRsvpAuth } = require("../middlewares/auth");
const {
  validateId,
  validateHackathon,
  isValidRSVP,
  validateResult,
} = require("../middlewares/validator");

const router = express.Router();
//GET /hackthons : send all hackthonss to the user

router.get("/", controller.index);

//GET /hackthons/new: send html form for creating a new story.
router.get("/new", isLoggedIn, controller.new);

//POST /hackthons: create a new story
router.post(
  "/",
  isLoggedIn,
  validateHackathon,
  validateResult,
  controller.create
);

//GET /hackthons/:id: send details of story identified by id
router.get("/:id", validateId, controller.show);

//GET /hackthons/:id/edit: send html form for edting an existing story
router.get("/:id/edit", validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /hackthons/:id: update the story identified by the id
router.put(
  "/:id",
  validateId,
  isLoggedIn,
  isAuthor,
  validateHackathon,
  validateResult,
  controller.update
);

//DELETE /hackthons/:id, delete the story identified by id
router.delete("/:id", validateId, isLoggedIn, isAuthor, controller.delete);

//POST /hackthons/:id/rsvp : create new rsvp details
router.post(
  "/:id/rsvp",
  validateId,
  isLoggedIn,
  isRsvpAuth,
  isValidRSVP,
  controller.newRsvp
);

//DELETE /hackathons/:id/rsvp : delete rsvp details
router.delete("/:id/rsvp", validateId, isLoggedIn, controller.deleteRsvp);

module.exports = router;
