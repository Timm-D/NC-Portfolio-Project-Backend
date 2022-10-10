const db = require("../db/connection")

exports.fetchCategories = () => {
    return db.query("SELECET * FROM categories;").then((result)=> {
        return result.rows
    })
}