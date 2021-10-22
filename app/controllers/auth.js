const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 *  login controller checks for the valid login
 *  if the user is valid it sets up a cookie and returns jwt token as well
 */

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: "invalid username or password" });
    }

    const token = jwt.sign(
      JSON.stringify({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }),
      process.env.JWT_PRIVATE_KEY || "super_secret_private_key"
    );

    res.clearCookie("demo-auth");
    res.cookie("demo-auth", token, { maxAge: 9000000, httpOnly: true });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "authentication failed" });
  }
};

const signup = async (req, res) => {
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

/**
 * isAuthorized middleware is responsible for checking for authenticated user
 * first it looks for the jwt token in the Authorization header if it's not existed
 * then it looks for the cookie
 * if one of the Authorization header or the cookie existed and valid
 * the middle ware allow the request to access the protected route
 */

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies["demo-auth"];
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY || "super_secret_private_key"
    );
    req.user = user;
    return next();
  } catch (ex) {
    return res.status(401).json({ error: "not authorized!" });
  }
};

module.exports = { login, signup, isAuthorized };
