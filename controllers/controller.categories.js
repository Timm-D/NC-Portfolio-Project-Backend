const { fetchCategories } = require("../models/model.categories");

exports.getCategories = (req, res, next) => {
  // console.log("in the controller")
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};
