const express = require("express");
const app = express();

const {getCategories} = require("./controllers/controller.categories")
// app.use(express.json());

app.get("/api/categories", getCategories);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({msg: "Internal Server Error"})
});

module.exports = app
