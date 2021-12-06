const { body } = require("express-validator");
const { validationResult } = require("express-validator");

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
      let date = new Date(req.body.date).toISOString();
      let dateObj = Date.parse(date);
      // let dateObj = DateTime.fromFormat(Date, "yyyy-MM-dd");
      if (!dateObj.isValid) {
        throw new Error("Date is not a valid Date");
      } else {
        //let dateNow = DateTime.now().toFormat("yyyy-MM-dd");
        let dateNow = Date.now();
        let entredDate = new Date(req.body.date).getTime();
        if (entredDate <= dateNow) {
          throw new Error("Date should be after today's Date");
        } else return true;
      }
    }),
  body("start_time", "start time cannot be empty")
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      let startTime = req.body.start_time;
      let dateObj = DateTime.fromFormat(startTime, "HH:mm");
      if (!dateObj.isValid) {
        throw new Error("Start Time is not a valid Time");
      } else {
        let dateNow = DateTime.now().toFormat("HH:mm");
        if (req.body.Start_time <= dateNow) {
          throw new Error("Start_Time should be after current Time");
        } else return true;
      }
    }),
  body("end_time", "end time cannot be empty")
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      let Date = req.body.end_time;
      let dateObj = DateTime.fromFormat(Date, "HH:mm");
      if (!dateObj.isValid) {
        throw new Error("end time is not a valid Date");
      } else {
        let dateNow = DateTime.now().toFormat("HH:mm");
        if (req.body.end_time <= dateNow) {
          throw new Error("end time should be after start time");
        } else return true;
      }
    }),
];

exports.isValidRSVP = [
  body("status", "status should be YES, NO or MAYBE")
    .isEmpty()
    .isIn(["YES", "NO", "MAYBE"]),
];
