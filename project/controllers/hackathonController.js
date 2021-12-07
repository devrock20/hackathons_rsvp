//model require
const model = require("../models/hackathons");
const rsvpModel = require("../models/rsvp");

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
  Promise.all([
    model.findById(id).populate("host_name", "firstName lastName"),
    rsvpModel.count({ hackathon_id: id }),
  ])
    .then((results) => {
      const [hackathon, rsvps] = results;
      if (hackathon) {
        console.log(rsvps);
        res.render("./hackathons/show", { hackathon, rsvps });
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
  console.log("in delete call");
  Promise.all([
    model.findByIdAndDelete(id, { useFindAndModify: false }),
    rsvpModel.deleteMany({ hackathon_id: id }),
  ])
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

//create new rsvp
exports.newRsvp = (req, res, next) => {
  let rsvp_value = req.body.rsvp_value.toUpperCase();
  console.log(rsvp_value);
  rsvpModel
    .find({ hackathon_id: req.params.id, user_id: req.session.user })
    .then((rsvpDoc) => {
      if (rsvpDoc.length == 1) {
        rsvpDoc[0].rsvp_value = rsvp_value;
        rsvpModel
          .findByIdAndUpdate(rsvpDoc[0]._id, rsvpDoc[0], {
            useFindAndModify: false,
            runValidators: true,
          })
          .then((rsvp) => {
            if (rsvp) {
              req.flash("success", "RSVP update successful");
              res.redirect("/users/profile");
            } else {
              let err = new Error("Could not update RSVP");
              err.status = 404;
              next(err);
            }
          })
          .catch((err) => next(err));
      } else {
        let rsvpDoc = new rsvpModel();
        rsvpDoc.rsvp_value = rsvp_value;
        rsvpDoc.user_id = req.session.user;
        rsvpDoc.hackathon_id = req.params.id;
        rsvpDoc
          .save()
          .then((rsvp) => {
            req.flash("success", "RSVP creation successful");
            res.redirect("/users/profile");
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

//delete rsvp
exports.deleteRsvp = (req, res, next) => {
  rsvpModel
    .deleteOne({ hackathon_id: req.params.id, user_id: req.session.user })
    .then((rsvp) => {
      req.flash("success", "RSVP deleted successfully");
      res.redirect("/users/profile");
    })
    .catch((err) => next(err));
};
