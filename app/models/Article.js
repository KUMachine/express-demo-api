const mongoose = require("mongoose");

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
    default: "61709163a87b3ae538a323a5",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", schema);
