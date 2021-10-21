const express = require("express");
const Article = require("../models/Article");
const useAuth = require("../../utils/useAuth");

async function all(req, res, next) {
  console.log(req.user);
  const user = useAuth(req);
  if (!user) {
    return res.status(401).json({ error: "not authorized" });
  }
  const articles = await Article.find();
  res.send(articles);
}
async function one(req, res, next) {
  const user = await Article.findOne({ name: req.params.articleId });
  res.send(user);
}
async function create(req, res, next) {
  const user = useAuth(req);
  if (!user) {
    return res.status(401).json({ error: "not authorized" });
  }
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
