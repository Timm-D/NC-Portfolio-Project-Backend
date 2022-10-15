const db = require("../db/connection");
const format = require("pg-format");
const reviews = require("../db/data/test-data/reviews");

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews. *, COUNT(comment_id) ::INT AS comment_count 
      FROM reviews 
      LEFT JOIN comments
      ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return result.rows[0];
    });
};


exports.fetchReviews = (query) => {
  const selectJoin = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count 
  FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  const queryStatement = " WHERE reviews.category = $1";

  const groupOrder = ` GROUP BY comments.review_id, reviews.review_id 
  ORDER BY created_at DESC`;

  if (query === undefined) {
    return db.query(selectJoin + groupOrder).then((reviews) => {
      return reviews.rows;



exports.fetchCommentsByreview = (review_id) => {
  console.log("in the model")
  const query = `SELECT * FROM comments WHERE review_id = $1
  ORDER BY created_at DESC`;

  return db.query(query, [review_id]).then(({rows : comments}) => {
    return comments;
  })

}

exports.updateReview = (review_id, inc_votes) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $2
   WHERE review_id = $1 RETURNING *`,
      [review_id, inc_votes]
    )
    .then(({ rows: [review] }) => {
      if (!review) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return review;

    });
  }
  if (query !== undefined)
    return db
      .query("SELECT * FROM categories WHERE slug = $1", [query])
      .then((response) => {
        if (response.rows.length === 0) {
          return Promise.reject({
            status: 404,
            message: "Not Found",
          });
        }
        return db
          .query(selectJoin + queryStatement + groupOrder, [query])
          .then((review) => {
            return review.rows;
          });
      });
};
