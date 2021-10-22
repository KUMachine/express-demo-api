const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { PORT, DB_URL } = require("./config/env/development");

mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  require("./config/router")(app);

  app.listen(PORT, () => {
    console.log(`Express-demo-app listening at http://localhost:${PORT}`);
  });
});
