const db = require("../db/connection");
const format = require("pg-format");
const reviews = require("../db/data/test-data/reviews");

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

exports.fetchReviews = 
 

// exports.updateReview = (review_id, inc_votes) => {
//   return db
//     .query(
//       `UPDATE reviews SET votes = votes + $2
//    WHERE review_id = $1 RETURNING *`,
//       [review_id, inc_votes]
//     )
//     .then(({ rows: [review] }) => {
//       if (!review) {
//         return Promise.reject({ status: 404, msg: "Not Found" });
//       }
//       return review;
//     });
// };
