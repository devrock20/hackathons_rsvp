//model require
const model = require("../models/connections");

// shows all the hackthons
exports.connections = (req, res) => {
  let connections = model.getConnections();
  let categoryNames = model.getConnectionTopics();
  res.render("./connections/index", { connections, categoryNames });
};
// Start a new hackthon button -> creating new form
exports.new = (req, res, next) => {
  res.render("./connections/create");
};

// create (post) the new hackthon
exports.create = (req, res) => {
  let connection = req.body;
  model.save(connection);
  res.redirect("/connections");
};

// each hackthon details
exports.detail = (req, res, next) => {
  let id = req.params.id;
  let connection = model.findById(id);
  if (connection) {
    res.render("./connections/show", { connection });
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Calling Edit page to edit the hackthon detail
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let connection = model.findById(id);
  if (connection) {
    res.render("./connections/edit", { connection });
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

//Update the hackthon details
exports.update = (req, res) => {
  let connection = req.body;
  let id = req.params.id;
  if (model.updateById(id, connection)) {
    res.redirect("/connections/edit");
  } else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};

// delete the meet
exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteById(id)) res.redirect("/connections/");
  else {
    let err = new Error("Cannot find a Hackthon with id " + id);
    err.status = 404;
    next(err);
  }
};
