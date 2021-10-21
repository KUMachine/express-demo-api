const user = require("../app/controllers/users");
const articles = require("../app/controllers/articles");
const auth = require("../app/controllers/auth");

module.exports = function (app) {
  app.get("/api/users", user.all);
  app.get("/api/users/:userId", user.one);
  app.post("/api/users/", user.create);
  app.delete("/api/users/:userId", user.remove);

  app.get("/api/articles", auth.isAuthorized, articles.all);
  app.get("/api/articles/:articleId", articles.one);
  app.post("/api/articles/", articles.create);
  app.delete("/api/articles/:articleId", articles.remove);

  app.post("/api/login", auth.login);
  app.post("/api/signup", auth.signup);

  // app.get("/", (req, res) => {
  //   res.render("./index.ejs", { document: "the index page here..." });
  // });
};
