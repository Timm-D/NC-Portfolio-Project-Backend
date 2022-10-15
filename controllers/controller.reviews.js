const {
  fetchReviewById,
  updateReview,
  fetchReviews,
  fetchCommentsForReview,
  createComment

} = require("../models/model.review");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { category } = req.query;
  fetchReviews(category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};
exports.patchReview = (req, res, next) => {
  const { review_id } = req.params;
  const {
    body: { inc_votes },
  } = req;

  updateReview(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      err.review_id = review_id;
      err.inc_votes = inc_votes;
      next(err);
    });
};

exports.getCommentsForReview = (req, res, next) => {
  fetchCommentsForReview(req.params)
  .then( (comments) => {
      res.status(200).send({comments});
  })
  .catch(next)
}

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;

  createComment(review_id, username, body)
  .then((newComment) => {
    res.status(201).send({ newComment })
  })
  .catch(next)
}