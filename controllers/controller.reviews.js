const { fetchReviewById, fetchCommentsByreview } = require("../models/model.review");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getCommentsByReview = (req, res, next) => {
  console.log("in the controller")
  const {review_id} = req.params
  fetchCommentsByreview(review_id).then((comments) => {
    res.status(200).send({ comments });
  })
  .catch(next)
};
