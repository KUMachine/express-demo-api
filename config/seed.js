const mongoose = require("mongoose");
const Article = require("../app/models/Article");
const User = require("../app/models/User");

const { DB_URL } = require("./env/development");

const seed = async () => {
  mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .then(async () => {
      console.log("seeding the databsse...");

      await User.deleteMany();
      await Article.deleteMany();

      const user1 = new User({
        firstname: "john",
        lastname: "doe",
        email: "johndoe@mail.com",
        password: "supersecret",
      });

      console.log("User Created:");
      console.log(user1);

      await user1.save();
      const user2 = new User({
        firstname: "tony",
        lastname: "hawk",
        email: "tonyhawk@mail.com",
        password: "secretword",
      });
      await user2.save();

      console.log("User Created:");
      console.log(user1);

      const article1 = new Article({
        title: "first article",
        description: "some description",
        authorId: user1.id,
      });
      await article1.save();

      console.log("Article Created:");
      console.log(article1);

      const article2 = new Article({
        title: "second article",
        description: "some description for the second article",
        authorId: user2.id,
      });
      await article2.save();

      console.log("Article Created:");
      console.log(article2);
    })
    .finally(() => process.exit(0));
};

seed();
