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

// TICKET 03

describe.only("GET/api/categories", () => {
  test("200: responds with a categories object containing an array of objects, each with properties of 'slug' and 'description'", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
          const {categories} = body;
          expect(categories.length).toBe(4);
          expect(Array.isArray(categories)).toBe(true);

          categories.forEach((category) => {
            expect.objectContaining({
              slug: expect.any(string),
              description: expect.any(string),
            });
          });
      });
  });
})

test("404: returns 'Not found' when url is incorrect", () => {
  return request(app)
    .get("/api/nothingdoinghere")
    .expect(404)
    .then((response) => {
      expect(response.msg).toEqual({ msg: "Not Found" });
    });
});
