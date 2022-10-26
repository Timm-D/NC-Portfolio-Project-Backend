const {
  fetchReviewById,
  updateReview,
  fetchReviews,
  fetchCommentsForReview,
  addCommentToReview,
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
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentForReview = (request, response, next) => {
  const { review_id } = request.params;
  const { username, body } = request.body;

  fetchReviewById(review_id)
    .then(() => {
      addCommentToReview(review_id, username, body)
        .then((postedComment) => {
          response.status(201).send({ postedComment });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
