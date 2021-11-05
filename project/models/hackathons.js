const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackthonSchema = new Schema({
  connection_name: {
    type: String,
    required: [true, "hackthon name is required"],
  },
  connection_topic: {
    type: String,
    required: [true, "hackthon topic is required"],
  },
  details: {
    type: String,
    required: [true, "details is required"],
    minlength: [10, "the details needs to have at least 10 characters"],
  },
  date: {
    type: String,
    required: [true, "date is required"],
  },
  start_time: {
    type: String,
    required: [true, "start time is required"],
  },
  end_time: {
    type: String,
    required: [true, "end time is required"],
  },
  host_name: {
    type: String,
    required: [true, "host name is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  image_url: {
    type: String,
    required: [true, "image_url is required"],
  },
});

module.exports = mongoose.model("Hackthons", hackthonSchema);
