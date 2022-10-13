const db = require("../db/connection");
const format = require("pg-format");

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT * 
    FROM reviews
    WHERE review_id = $1`,
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
