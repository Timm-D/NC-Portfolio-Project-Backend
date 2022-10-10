const { fetchAPI } = require("../models");

exports.getAPI = (req, res, next) => {
  fetchAPI()
    .then((file) => {
      res.status(200).send({ file });
    })
    .catch(next);
};
