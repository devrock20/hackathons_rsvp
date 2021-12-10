const model = require("../models/user");
const hackathons = require("../models/hackathons");
const rsvp = require("../models/rsvp");

exports.new = (req, res) => {
  if (!req.session.user) return res.render("./user/new");
  else {
    req.flash("error", "You are logged in already");
    return res.redirect("/users/profile");
  }
};

exports.create = (req, res, next) => {
  //res.send('Created a new story');
  let user = new model(req.body); //create a new story document
  user
    .save() //insert the document to the database
    .then((user) => {
      req.flash("success", "Registration successfull");
      res.redirect("/users/login");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        return res.redirect("back");
      }

      if (err.code === 11000) {
        req.flash("error", "Email has been used");
        return res.redirect("/users/new");
      }

      next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
  res.render("./user/login");
};

exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "wrong email address");
        res.redirect("/users/login");
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            req.session.user = user._id;
            req.session.userFirstName = user.firstName;
            req.flash("success", "You have successfully logged in");
            res.redirect("/");
          } else {
            req.flash("error", "wrong password");
            res.redirect("/users/login");
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.profile = (req, res, next) => {
  let id = req.session.user;
  Promise.all([
    model.findById(id),
    hackathons.find({ host_name: id }),
    rsvp
      .find({ user_id: id })
      .populate("hackathon_id", "connection_name connection_topic"),
  ])
    .then((results) => {
      const [user, hackathons, rsvps] = results;
      res.render("./user/profile", { user, hackathons, rsvps });
    })
    .catch((err) => next(err));
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else res.redirect("/");
  });
};
