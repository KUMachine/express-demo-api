const mongoose = require("mongoose");

// defalut valus are used because there is no validation used in this project
const schema = mongoose.Schema({
  firstname: {
    type: String,
    default: "unknown",
  },
  lastname: {
    type: String,
    default: "unknown",
  },
  email: {
    type: String,
    default: "unknown@email.com",
  },
  password: {
    type: String,
    default: "changeme",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", schema);
