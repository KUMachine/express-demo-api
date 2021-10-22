const Article = require("../models/Article");

/**
 * these are the controllers for the Article model
 */

async function all(req, res, next) {
  const articles = await Article.find();
  res.send(articles);
}

async function one(req, res, next) {
  const article = await Article.findOne()
    .where("_id")
    .equals(req.params.articleId);

  if (!article) return res.status(404).json({ error: "not found" });

  res.send(article);
}

async function create(req, res, next) {
  const { title, description } = req.body;
  const article = new Article({
    title,
    description,
    authorId: req.user.id,
  });
  await article.save();
  res.json(article);
}

const edit = async (req, res) => {
  const { title, description } = req.body;
  const article = await Article.findById(req.params.articleId);

  if (!article) return res.status(404).json({ error: "not found" });

  article.title = title || article.title;
  article.description = description || article.description;
  await article.save();
  res.json(article);
};
async function remove(req, res, next) {
  const article = Article.findOne().where("_id").equals(req.params.articleId);

  if (!article) return res.status(404).json({ error: "not found" });

  await article.deleteOne();
  res.json(article);
}

module.exports = { all, one, create, edit, remove };
