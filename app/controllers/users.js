const User = require("../models/User");

const all = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const one = async (req, res) => {
  const user = await User.findOne().where("_id").equals(req.params.userId);

  if (!user) return res.status(404).json({ error: "not found!" });

  res.json(user);
};

const me = async (req, res) => {
  const user = await User.findOne().where("_id").equals(req.user.id);
  res.json(user);
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

const edit = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user = await User.findById(req.params.userId);

  if (!user) return res.status(404).json({ error: "not found!" });

  user.firstname = firstname || req.user.firstname;
  user.lastname = lastname || req.user.lastname;
  user.email = email || req.user.email;
  user.password = password || req.user.password;
  await user.save();
  res.json(user);
};

const remove = async (req, res) => {
  const user = await User.findOne().where("_id").equals(req.user.id);

  if (!user) return res.status(404).json({ error: "not found!" });

  await user.deleteOne();
  res.send(user);
};

module.exports = { all, one, me, create, edit, remove };
