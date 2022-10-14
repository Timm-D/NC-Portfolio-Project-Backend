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

exports.fetchReviews = async (category) => {

  let queryString = `SELECT reviews.*, COUNT(comment_id) ::INT AS comment_count 
  FROM reviews 
  LEFT JOIN comments ON reviews.review_id = comments.review_id 
  GROUP BY reviews.review_id
  ORDER BY created_at DESC`;
  if(category) {
    queryString += format(` HAVING category = %L `, category)
  }

  const reviews = await db.query(queryString)
  
  
  if(!reviews.rows.length){
    return Promise.reject({status: 404, msg: "Not Found"})
  } 
  return reviews.rows
}

