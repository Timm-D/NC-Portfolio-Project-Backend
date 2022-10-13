const db = require("../db/connection");
const format = require("pg-format");

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
};
