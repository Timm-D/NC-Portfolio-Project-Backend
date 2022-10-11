const express = require("express");
const app = express();

const {getCategories} = require("./controllers/controller.categories")
// app.use(express.json());

app.get("/api/categories", getCategories);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
