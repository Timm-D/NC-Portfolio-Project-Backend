const { fetchCategories } = require("../models/model.topic");

exports.getCategories = (err, req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
