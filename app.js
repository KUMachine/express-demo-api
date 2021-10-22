const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/demodb", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    const PORT = process.env.PORT || "3000";

    require("./config/router")(app);

    app.listen(PORT, () => {
      console.log(`Express-demo-app listening at http://localhost:${PORT}`);
    });
  });
