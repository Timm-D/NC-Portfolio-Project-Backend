const fs = require("fs/promises");

exports.fetchAPI = () => {
  return fs.readFile("./endpoints.json", "utf-8").then((file) => {
    return JSON.parse(file);
  });
};
