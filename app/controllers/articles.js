const Article = require("../models/Article");

async function all(req, res, next) {
  const articles = await Article.find();
  res.send(articles);
}
async function one(req, res, next) {
  const user = await Article.findOne({ name: req.params.articleId });
  res.send(user);
}
async function create(req, res, next) {
  const { title, description } = req.body;
  const article = new Article({
    title,
    description,
    authorId: user.id,
  });
  await article.save();
  res.json(article);
}
async function remove(req, res, next) {
  const article = Article.findOne().where("_id").equals(req.params.articleId);
  await article.deleteOne();
  res.json(article);
}

module.exports = { all, one, create, remove };
