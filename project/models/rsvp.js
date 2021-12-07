const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
  hackathon_id: {
    type: Schema.Types.ObjectId,
    ref: "Hackthons",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rsvp_value: {
    type: String,
  },
});
module.exports = mongoose.model("Rsvp", rsvpSchema);
