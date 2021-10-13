//model require
const model = require("../models/hackthons");

// shows all the hackthons
exports.index = (req, res) => {
  let hackthons = model.getHackthons();
  let categoryNames = model.getHackthonTopics();
  res.render("./hackthons/index", { hackthons, categoryNames });
};
// Start a new hackthon button -> creating new form
exports.new = (req, res, next) => {
  res.render("./hackthons/create");
};

// create (post) the new hackthon
exports.create = (req, res) => {
  let hackthon = req.body;
  console.log(hackthon);
  model.save(hackthon);
  res.redirect("/hackthons");
};

// each hackthon details
exports.show = (req, res, next) => {
  let id = req.params.id;
  let hackthon = model.findById(id);
  if (hackthon) {
    res.render("./hackthons/show", { hackthon });
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Calling Edit page to edit the hackthon detail
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let hackthon = model.findById(id);
  if (hackthon) {
    res.render("./hackthons/edit", { hackthon });
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Update the hackthon details
exports.update = (req, res) => {
  let hackthon = req.body;
  let id = req.params.id;
  if (model.updateById(id, hackthon)) {
    res.redirect("/hackthons/" + id);
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

// delete the meet
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) res.redirect("/hackthons/");
  else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};
