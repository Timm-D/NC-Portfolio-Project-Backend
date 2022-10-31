const db = require("../db/connection");
const format = require("pg-format");

exports.checkIfDataExists = async (table, column, value) => {
  const allowedTables = ["reviews", "users", "categories", "comments"];
  const allowedColumns = [
    "body",
    "votes",
    "author",
    "review_id",
    "created_at",
    "slug",
    "description",
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "avatar_url",
    "username",
    "name",
    "comment_id",
  ];

  if (!allowedTables.includes(table) || !allowedColumns.includes(column)) {
    return Promise.reject({ status: 404, msg: "Resource Not Found" });
  }
  const queryString = format("SELECT * FROM %s WHERE %s = $1;", table, column);
  const queryResult = await db.query(queryString, [value]);

  if (!queryResult.rows.length) {
    return Promise.reject({ status: 404, msg: "Resource Not Found" });
  }
};
