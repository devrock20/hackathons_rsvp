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
    validator: (rsvp_value) => {
      let values = ["YES", "NO", "MAYBE"];
      return values.includes(rsvp_value);
    },
    message: "Rsvp value can only be YES, NO or MAYBE",
    required: true,
  },
});
module.exports = mongoose.model("Rsvp", rsvpSchema);
