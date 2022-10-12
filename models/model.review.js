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
