const User = require("../models/User");

const all = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const one = async (req, res) => {
  const user = await User.findOne().where("_id").equals(req.params.userId);
  res.send(user);
};

const create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    password,
  });
  await user.save();
  res.json(user);
};

const remove = async (req, res) => {
  const user = await User.findOne().where("_id").equals(req.params.userId);
  await user.deleteOne();
  res.send(user);
};

module.exports = { all, one, create, remove };
