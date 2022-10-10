process.env.NODE_ENV = "test";

const request = require("supertest");
require("jest-sorted");

const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterEach(() => {
  return db.end();
});
