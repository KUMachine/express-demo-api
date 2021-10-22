const user = require("../app/controllers/users");
const articles = require("../app/controllers/articles");
const auth = require("../app/controllers/auth");

module.exports = function (app) {
  app.get("/api/users", user.all);
  app.get("/api/users/me", auth.isAuthorized, user.me);
  app.get("/api/users/:userId", user.one);
  app.post("/api/users/", user.create);
  app.put("/api/users/:userId", auth.isAuthorized, user.edit);
  app.delete("/api/users/:userId", auth.isAuthorized, user.remove);

  app.get("/api/articles", articles.all);
  app.get("/api/articles/:articleId", articles.one);
  app.post("/api/articles/", auth.isAuthorized, articles.create);
  app.put("/api/articles/:articleId", auth.isAuthorized, articles.edit);
  app.delete("/api/articles/:articleId", auth.isAuthorized, articles.remove);

  app.post("/api/login", auth.login);
  app.post("/api/signup", auth.signup);
};
