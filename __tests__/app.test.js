process.env.NODE_ENV = "test";

const request = require("supertest");
// require("jest-sorted");

const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

// TICKET 03

describe("GET/api/categories", () => {
  test("200: responds with a categories object containing an array of objects, each with properties of 'slug' and 'description'", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories.length).toBe(4);
        expect(Array.isArray(categories)).toBe(true);

        categories.forEach((category) => {
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

test("404: returns 'Not found' when url is incorrect", () => {
  return request(app)
    .get("/api/nothingdoinghere")
    .expect(404)
    .then((response) => {
      expect(response.body).toEqual({ msg: "Not Found" });
    });
});
//TICKET 04
describe.only("GET/api/reviews/:review_id", () => {
  test("200: responds with an object containing the properties of a given review_id", () => {
    return request(app)
      .get("/api/reviews/13")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 13,
            title: "Settlers of Catan: Don't Settle For Less",
            designer: "Klaus Teuber",
            owner: "mallionaire",
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            review_body:
              "You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.",
            category: "social deduction",
            created_at: new Date(788918400),
            votes: 16,
          })
        );
      });
  });
  test("400: return 'invalid input' when given an invalid id type", () => {
    return request(app)
      .get("api/reviews/string")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqaul({ msg: "Invalid Input" });
      });
  });
  test("404: returns 'Not Found' when given an ID number not contained in the db", () => {
    return request(app)
      .get("api/reviews/999")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Not Found" });
      });
  });
});
