const { Mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
  hackthon_id: {
    type: Schema.type.ObjectId,
    ref: "Hackthons",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rsvpSchema: {
    type: String,
    validator: (rsvp_value) => {
      let values = ["yes", "no", "maybe"];
      return values.includes(rsvp_value.toLowerCase());
    },
    message: "Rsvp value can only be yes, no or maybe",
    required: true,
  },
});
module.exports = mongoose.model("Rsvp", rsvpSchema);
