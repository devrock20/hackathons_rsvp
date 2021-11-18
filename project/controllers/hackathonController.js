//model require
const model = require("../models/hackathons");

// shows all the hackathons
exports.index = (req, res, next) => {
  //res.send('send all hackthons');
  model
    .find()
    .then((hackathons) => {
      let categoryNames = GetTopicNames(hackathons);
      if (categoryNames === undefined) {
        let err = new Error("No Hackthons in the database");
        err.status = 404;
        next(err);
      } else {
        res.render("./hackathons/index", { hackathons, categoryNames });
      }
    })
    .catch((err) => next(err));
};

GetTopicNames = function (hackathons) {
  let names = undefined;
  hackathons.forEach((element) => {
    let topicName = element.connection_topic;
    if (names === undefined) {
      names = [];
      names.push(topicName);
    } else if (names.findIndex((name) => name === topicName) == -1) {
      names.push(topicName);
    }
  });
  return names;
};

// Start a new hackathon button -> creating new form
exports.new = (req, res, next) => {
  res.render("./hackathons/create");
};

// create (post) the new hackathon
exports.create = (req, res, next) => {
  let hackathon = new model(req.body); // create a new story document
  hackathon.host_name = req.session.user;
  hackathon
    .save() //save the document in the database.
    .then((hackthon) => {
      req.flash("success", "hackathon was created successfully");
      res.redirect("/hackathons");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        res.redirect("back");
      }
      next(err);
    });
};

// each hackathon details
exports.show = (req, res, next) => {
  let id = req.params.id;
  model
    .findById(id)
    .populate("host_name", "firstName lastName")
    .then((hackathon) => {
      if (hackathon) {
        res.render("./hackathons/show", { hackathon });
      } else {
        let err = new Error("Cannot find a hackathon with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

//Calling Edit page to edit the hackathon detail
exports.edit = (req, res, next) => {
  let id = req.params.id;
  model
    .findById(id)
    .then((hackathon) => {
      if (hackathon) {
        res.render("./hackathons/edit", { hackathon });
      } else {
        let err = new Error("Cannot find a hackathon with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};

//Update the hackathon details
exports.update = (req, res, next) => {
  let hackathon = req.body;
  let id = req.params.id;
  model
    .findByIdAndUpdate(id, hackathon, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((hackathon) => {
      if (hackathon) {
        req.flash("success", "hackathon was updated successfully");
        res.redirect("/hackathons/" + id);
      } else {
        let err = new Error("Cannot find a hackathon with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") req.flash("error", err.message);
      res.redirect("back");
    });
};

// delete the hackathon.
exports.delete = (req, res, next) => {
  let id = req.params.id;
  model
    .findByIdAndDelete(id, { useFindAndModify: false })
    .then((hackathon) => {
      if (hackathon) {
        req.flash("success", "hackathon was deleted successfully");
        res.redirect("/hackathons/");
      } else {
        let err = new Error("Cannot find a hackathon with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));
};
