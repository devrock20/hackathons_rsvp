//model require
const model = require("../models/hackathons");

// shows all the hackathons
exports.index = (req, res) => {
  let hackathons = model.getHackathons();
  let categoryNames = model.getHackathonTopics();
  res.render("./hackathons/index", { hackathons, categoryNames });
};
// Start a new hackathon button -> creating new form
exports.new = (req, res, next) => {
  res.render("./hackathons/create");
};

// create (post) the new hackathon
exports.create = (req, res) => {
  let hackathon = req.body;
  console.log(hackathon);
  model.save(hackathon);
  res.redirect("/hackathons");
};

// each hackathon details
exports.show = (req, res, next) => {
  let id = req.params.id;
  let hackathon = model.findById(id);
  if (hackathon) {
    res.render("./hackathons/show", { hackathon });
  } else {
    let err = new Error("Cannot find a hackathon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Calling Edit page to edit the hackathon detail
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let hackathon = model.findById(id);
  if (hackathon) {
    res.render("./hackathons/edit", { hackathon });
  } else {
    let err = new Error("Cannot find a hackathon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Update the hackathon details
exports.update = (req, res) => {
  let hackathon = req.body;
  let id = req.params.id;
  if (model.updateById(id, hackathon)) {
    res.redirect("/hackathons/" + id);
  } else {
    let err = new Error("Cannot find a hackathon with id " + id);
    err.status = 404;
    next(err);
  }
};

// delete the meet
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) res.redirect("/hackathons/");
  else {
    let err = new Error("Cannot find a hackathon with id " + id);
    err.status = 404;
    next(err);
  }
};
