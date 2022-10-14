const express = require("express");
const app = express();

const { getCategories } = require("./controllers/controller.categories");

const { getUsers } = require("./controllers/controller.users");

const {
  getReviewById,
  patchReview,
  getReviews
} = require("./controllers/controller.reviews");
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/users", getUsers);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

// app.patch("/api/reviews/:review_id", patchReview);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Input" });
  } else {
    if (err.code === "23502") {
      res.status(400).send({ msg: "Invalid Input" });
    }
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
