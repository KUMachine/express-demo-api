const mongoose = require("mongoose");

// defalut valus are used because there is no validation used in this project
const schema = mongoose.Schema({
  title: {
    type: String,
    default: "unknown",
  },
  description: {
    type: String,
    default: "unknown",
  },
  authorId: {
    type: mongoose.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", schema);
