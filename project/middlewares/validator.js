const { body } = require("express-validator");
const { validationResult, check } = require("express-validator");
const { DateTime } = require("luxon");

exports.validateId = (req, res, next) => {
  let id = req.params.id;
  //an objectId is a 24-bit Hex string
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  } else {
    let err = new Error("Invalid HackthonID Value");
    err.status = 400;
    return next(err);
  }
};

exports.validateSignUp = [
  body("firstName", "First Name cannot be empty").notEmpty().trim().escape(),
  body("lastName", "Last name cannot be empty").notEmpty().trim().escape(),
  body("email", "Email must be a valid email address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body(
    "password",
    "Password must be at least 8 characters and at most 64 characters"
  ).isLength({ min: 8, max: 64 }),
];

exports.validateLogIn = [
  body("email", "Email must be a valid email address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body(
    "password",
    "Password must be at least 8 characters and at most 64 characters"
  ).isLength({ min: 8, max: 64 }),
];

exports.validateResult = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect("back");
  } else {
    return next();
  }
};

exports.validateHackathon = [
  body("connection_topic", "Hackathon Topic should be at least 3 characters")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body("connection_name", "Hackathon Name should be at least 3 characaters")
    .isLength({ min: 3 })
    .notEmpty()
    .trim()
    .escape(),
  body("details", "Details need to have at least 10 characters")
    .isLength({ min: 10 })
    .trim()
    .escape(),
  body("location", "location cannot be empty").notEmpty().trim().escape(),
  body("date", "date cannot be empty")
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      console.log(req.body.Date);
      let entered_date = req.body.date;
      let dateObj = DateTime.fromFormat(entered_date, "yyyy-MM-dd");
      if (!dateObj.isValid) {
        throw new Error("Date is not a valid Date");
      } else {
        let dateNow = DateTime.now().toFormat("yyyy-MM-dd");
        console.log(dateNow);
        if (entered_date <= dateNow) {
          throw new Error("Date should be after today's Date");
        } else return true;
      }
    }),
  body("start_time", "start time cannot be empty")
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      console.log(req.body.start_time);
      let startTime = DateTime.fromFormat(req.body.start_time, "HH:mm");
      if (!startTime.isValid) {
        throw new Error("Start Time is not a valid Time");
      } else {
        let dateNow = DateTime.now().toFormat("HH:mm");
        if (startTime <= dateNow) {
          throw new Error("start_time should be after current Time");
        } else return true;
      }
    }),
  body("end_time", "end time cannot be empty")
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      let end_time = DateTime.fromFormat(req.body.end_time, "HH:mm");
      if (!end_time.isValid) {
        throw new Error("end time is not a valid time");
      } else {
        if (req.body.start_time >= req.body.end_time) {
          throw new Error("end time should be after start time");
        } else return true;
      }
    }),
];

/*exports.isValidRSVP = (req, res, next) => {
  let rsvp_value = req.body.status.toUpperCase();
  let values = ["YES", "NO", "MAYBE"];
  if (!(rsvp_value in values)) {
    let err = new Error("Rsvp value can be YES, NO, MAYBE");
    err.status = 400;
    return next(err);
  } else {
    return next();
  }
};
*/
exports.isValidRSVP = [
  body("rsvp_value", "rsvp_value Cannot be empty")
    .notEmpty()
    .trim()
    .escape()
    .custom((value, { req }) => {
      let rsvp_value = req.body.rsvp_value.toUpperCase();
      let values = ["YES", "NO", "MAYBE"];
      if (values.includes(rsvp_value)) {
        return true;
      } else throw new Error("rsvp value can only be Yes, No or Maybe");
    }),
];
